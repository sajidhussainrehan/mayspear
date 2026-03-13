import T from "../../styles/theme.js";

export default function Eyebrow({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.gold }}>
      <span style={{ width: 24, height: 1, background: T.gold, display: "inline-block" }} />{children}
    </div>
  );
}
