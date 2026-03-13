import { useEffect } from "react";
import GLOBAL_CSS from "./styles/global.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import UspStrip from "./components/UspStrip.jsx";
import Services from "./components/Services.jsx";
import Approach from "./components/Approach.jsx";
import Sectors from "./components/Sectors.jsx";
import Process from "./components/Process.jsx";
import Team from "./components/Team.jsx";
import CTA from "./components/CTA.jsx";
import Blog from "./components/Blog.jsx";
import News from "./components/News.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <UspStrip />
      <Services />
      <Approach />
      <Sectors />
      <Process />
      <Team />
      <Blog />
      <News />
      <CTA />
      <Footer />
    </>
  );
}