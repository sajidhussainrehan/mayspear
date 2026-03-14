import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import UspStrip from "../components/UspStrip.jsx";
import Services from "../components/Services.jsx";
import Approach from "../components/Approach.jsx";
import Sectors from "../components/Sectors.jsx";
import Process from "../components/Process.jsx";
import Team from "../components/Team.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <UspStrip />
      <section id="services"><Services /></section>
      <section id="approach"><Approach /></section>
      <section id="sectors"><Sectors /></section>
      <Process />
      <section id="team"><Team /></section>
      <CTA />
      <Footer />
    </>
  );
}
