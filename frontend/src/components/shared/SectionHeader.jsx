import useReveal from "../../hooks/useReveal.js";
import Eyebrow from "./Eyebrow.jsx";
import T from "../../styles/theme.js";

export default function SectionHeader({ eyebrow, title, desc }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ marginBottom: "clamp(48px,6vw,80px)" }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: T.pure, lineHeight: 1.15, maxWidth: 700 }}>{title}</h2>
      {desc && <p style={{ fontSize: "1rem", lineHeight: 1.7, color: T.mist, maxWidth: 600, marginTop: 20 }}>{desc}</p>}
    </div>
  );
}
