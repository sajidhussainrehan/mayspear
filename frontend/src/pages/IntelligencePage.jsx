import Navigation from "../components/sections/Navigation";
import Intelligence from "../components/sections/Intelligence";
import Footer from "../components/sections/Footer";
import { STYLES } from "../styles/globalStyles";
import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useUtils";

export default function IntelligencePage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  useScrollReveal();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  // Inject styles on mount
  useEffect(() => {
    const id = "mg-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const mm = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", mm);
    let id;
    const anim = () => {
      const { x, y } = mouseRef.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.11;
      ringPos.current.y += (y - ringPos.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + "px";
        ringRef.current.style.top = ringPos.current.y + "px";
      }
      id = requestAnimationFrame(anim);
    };
    anim();
    return () => {
      document.removeEventListener("mousemove", mm);
      cancelAnimationFrame(id);
    };
  }, []);

  const hoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  };

  const scrollTo = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`mg-noise ${hovering ? "mg-hovering" : ""}`} style={{ position: "relative" }}>
      <div className="mg-cur-dot" ref={dotRef} />
      <div className="mg-cur-ring" ref={ringRef} />

      <Navigation
        navScrolled={navScrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        hoverProps={hoverProps}
      />

      <main style={{ paddingTop: "100px" }}>
        <Intelligence />
      </main>

      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}
