import { useEffect, useRef } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const scanAndObserve = () => {
      const els = document.querySelectorAll(".mg-rv:not(.in)");
      els.forEach(el => observer.observe(el));
    };

    // Initial scan
    scanAndObserve();

    // Watch for new elements added to the DOM
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          scanAndObserve();
        }
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
      const dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
      el.style.transform = `perspective(900px) rotateY(${dx*5}deg) rotateX(${-dy*5}deg) scale(1.01)`;
    };
    const ml = () => { el.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)"; };
    el.addEventListener("mousemove", mm);
    el.addEventListener("mouseleave", ml);
    return () => { el.removeEventListener("mousemove", mm); el.removeEventListener("mouseleave", ml); };
  }, [ref]);
}
