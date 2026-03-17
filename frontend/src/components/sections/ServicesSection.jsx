import { useState, useEffect } from "react";
import { getServices } from "../../services/api";
import { ScrollReveal } from "../common/ScrollReveal";
import ServeIcon from "../common/ServeIcon";
import { Link } from "react-router-dom";

export default function ServicesSection({ isFull = false }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const data = await getServices();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="services" className="mg-services-display" style={{ padding: "100px 0", background: "var(--ch2)" }}>
        <div className="mg-container">
          <div className="mg-sec-label">Our Services</div>
          <h2 className="mg-sec-h">Loading...</h2>
        </div>
      </section>
    );
  }

  const displayServices = isFull ? services : services.slice(0, 6);

  return (
    <section id="services" className="mg-services-display" style={{ padding: "130px 0", background: "var(--ch2)", borderTop: "1px solid rgba(200,191,176,0.06)" }}>
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Our Services</div>
          <h2 className="mg-sec-h">What We <em>Deliver</em></h2>
        </ScrollReveal>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "2px", 
          marginTop: "60px",
          background: "rgba(200,191,176,0.06)"
        }} className="mg-services-grid">
          {displayServices.map((service, index) => (
            <ScrollReveal key={service._id || index} style={{ transitionDelay: `${index * 65}ms` }}>
              <div style={{
                background: "var(--ch3)",
                padding: "48px 40px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.4s",
                height: "100%",
                minHeight: "280px"
              }} className="service-card">
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "var(--brass)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
                }} className="service-card-line" />

                <div style={{ width: "40px", height: "40px", marginBottom: "20px", opacity: 0.6 }}>
                  <ServeIcon type={service.icon || "circle"} resolve={false} />
                </div>

                <h3 style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "14px",
                  lineHeight: 1.2
                }}>
                  {service.title}
                </h3>

                <p style={{
                  fontFamily: "var(--body)",
                  fontSize: "0.9rem",
                  color: "var(--textF)",
                  lineHeight: 1.75
                }}>
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {!isFull && services.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Link to="/services" className="mg-btn-brass" style={{ textDecoration: 'none' }}>
              <span>View All Services</span>
            </Link>
          </div>
        )}

        {services.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--textF)", background: "var(--ch3)", marginTop: "60px" }}>
            <p>No services available.</p>
          </div>
        )}
      </div>

      <style>{`
        .service-card:hover {
          background: var(--ch4);
        }
        .service-card:hover .service-card-line {
          transform: scaleX(1);
        }
        @media(max-width: 1000px) {
          .mg-services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width: 600px) {
          .mg-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
