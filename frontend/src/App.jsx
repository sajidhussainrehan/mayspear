import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/sections/Navigation";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Manifesto from "./components/sections/Manifesto";
import Gap from "./components/sections/Gap";
import Pillars from "./components/sections/Pillars";
import Sectors from "./components/sections/Sectors";
import Capabilities from "./components/sections/Capabilities";
import Serve from "./components/sections/Serve";
import Approach from "./components/sections/Approach";
import ResolveDepth from "./components/sections/ResolveDepth";
import Intelligence from "./components/sections/Intelligence";
import Geography from "./components/sections/Geography";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import BlogsSection from "./components/sections/BlogsSection";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import PillarsPage from "./pages/PillarsPage";
import SectorsPage from "./pages/SectorsPage";
import ServePage from "./pages/ServePage";
import ApproachPage from "./pages/ApproachPage";
import IntelligencePage from "./pages/IntelligencePage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBlogs from "./components/admin/AdminBlogs";
import AdminEnquiries from "./components/admin/AdminEnquiries";
import AdminLogin from "./components/admin/AdminLogin";
import { useScrollReveal } from "./hooks/useUtils";
import { STYLES } from "./styles/globalStyles";
import "./App.css";

/* ─── CSS-in-JS styles injected once ─── */
const INJECTED_STYLES = STYLES;

// Main website component
function MainWebsite() {
  const [loaderOut, setLoaderOut] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const location = useLocation();

  useScrollReveal();

  useEffect(() => {
    const id = "mg-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = INJECTED_STYLES;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaderOut(true), 2600);
    return () => clearTimeout(t);
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

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [location.hash]);

  const scrollTo = useCallback((id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const hoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false)
  };

  return (
    <div className={`mg-noise ${hovering ? "mg-hovering" : ""}`} style={{ position: "relative" }}>
      <div className="mg-cur-dot" ref={dotRef} />
      <div className="mg-cur-ring" ref={ringRef} />

      <div className={`mg-loader ${loaderOut ? "out" : ""}`}>
        <div className="mg-loader-photo"><img src="/images/infrastructure/oil_rig.jpeg" alt="" /></div>
        <div className="mg-loader-overlay" />
        <div className="mg-loader-content">
          <div className="mg-loader-name"><span className="mg-loader-name-inner">Mayspear</span></div>
          <div className="mg-loader-sub">Infrastructure Advisory &nbsp;&middot;&nbsp; Capital Structuring &nbsp;&middot;&nbsp; Special Situations</div>
          <div className="mg-loader-bar-wrap"><div className="mg-loader-bar-fill" /></div>
        </div>
      </div>

      <Navigation
        navScrolled={navScrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        scrollTo={scrollTo}
        hoverProps={hoverProps}
      />

      <Hero scrollTo={scrollTo} hoverProps={hoverProps} />
      <Marquee />
      <Manifesto />
      <Gap />
      <Pillars />
      <Sectors />
      <Capabilities hoverProps={hoverProps} />
      <Serve hoverProps={hoverProps} />
      <Approach />
      <ResolveDepth />
      <Intelligence />
      <Geography />
      <BlogsSection />
      <Contact />
      <Footer scrollTo={scrollTo} hoverProps={hoverProps} />
    </div>
  );
}

// Protected route wrapper for admin
function ProtectedRoute() {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

// App with routing
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        <Route path="/pillars" element={<PillarsPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/serve" element={<ServePage />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
