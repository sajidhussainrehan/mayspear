import { useEffect, useRef } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".mg-rv");
    const check = () => {
      const wh = window.innerHeight;
      els.forEach(el => {
        if (el.getBoundingClientRect().top < wh * 0.92) el.classList.add("in");
      });
    };
    window.addEventListener("scroll", check);
    check();
    return () => window.removeEventListener("scroll", check);
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
