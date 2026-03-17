import { useState, useEffect, useCallback } from "react";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";
import ServicesSection from "../components/sections/ServicesSection";
import { useScrollReveal } from "../hooks/useUtils";

export default function ServicesPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  }, []);

  const hoverProps = { 
    onMouseEnter: () => setHovering(true), 
    onMouseLeave: () => setHovering(false) 
  };

  return (
    <div className={`mg-noise ${hovering ? "mg-hovering" : ""}`} style={{ position: "relative", minHeight: "100vh", background: "var(--ch)" }}>
      <Navigation 
        navScrolled={navScrolled} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        hoverProps={hoverProps}
      />
      <div style={{ paddingTop: "100px" }}>
        <ServicesSection isFull={true} />
      </div>
      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}
