'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Renders captured page HTML and re-implements the two client behaviours the
 * original Design Components handled in JS:
 *   1. scroll-reveal for [data-reveal] elements (IntersectionObserver + safety reveal)
 *   2. intercepting internal <a> clicks so navigation stays client-side (SPA)
 */
export default function PageBody({ html }) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // 1. Scroll reveal
    const targets = root.querySelectorAll('[data-reveal]');
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('ms-in');
              // Override inline styles
              e.target.style.opacity = '1';
              e.target.style.transform = 'none';
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      targets.forEach((t) => io.observe(t));
    } else {
      targets.forEach((t) => {
        t.classList.add('ms-in');
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
    }
    // Safety: reveal anything still hidden shortly after load.
    const safety = setTimeout(() => {
      targets.forEach((t) => {
        t.classList.add('ms-in');
        t.style.opacity = '1';
        t.style.transform = 'none';
      });
    }, 1400);

    // 2. Client-side internal navigation
    const onClick = (ev) => {
      const a = ev.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      // Internal absolute paths only; let external / hash / new-tab through.
      if (
        href.startsWith('/') &&
        !a.target &&
        !ev.metaKey && !ev.ctrlKey && !ev.shiftKey && !ev.altKey
      ) {
        ev.preventDefault();
        router.push(href);
      }
    };
    root.addEventListener('click', onClick);

    // 3. Form submissions (Contact / Opportunities) -> on-brand confirmation.
    const onSubmit = (ev) => {
      const form = ev.target.closest('form');
      if (!form || form.getAttribute('action')) return;
      ev.preventDefault();
      const note = document.createElement('div');
      note.style.cssText =
        'border:1px solid rgba(184,155,106,.3);padding:54px 44px;display:flex;flex-direction:column;align-items:flex-start;gap:20px';
      note.innerHTML =
        '<svg width="26" height="38" viewBox="0 0 20 30" fill="none"><path d="M10 0 L16 9 L10 14 L4 9 Z" fill="var(--accent,#B89B6A)"></path><rect x="9.25" y="12.5" width="1.5" height="17.5" fill="var(--accent,#B89B6A)"></rect><rect x="5.5" y="16" width="9" height="1.4" fill="var(--accent,#B89B6A)"></rect></svg>' +
        '<h3 style="font-family:\'Libre Caslon Display\',serif;font-size:clamp(26px,3vw,36px);line-height:1.08;color:#F4EFE6">Thank you. Your requirement has been received.</h3>' +
        '<p style="font-size:15.5px;line-height:1.68;color:#9A9081;max-width:46ch">It has been routed to the relevant desk. Where a situation is time sensitive, a principal responds directly, in strict confidence.</p>';
      form.replaceWith(note);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    root.addEventListener('submit', onSubmit);

    return () => {
      if (io) io.disconnect();
      clearTimeout(safety);
      root.removeEventListener('click', onClick);
      root.removeEventListener('submit', onSubmit);
    };
  }, [html, router]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
