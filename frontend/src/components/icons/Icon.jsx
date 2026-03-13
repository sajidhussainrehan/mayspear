import T from "../../styles/theme.js";

export default function Icon({ d, type = "path", ...p }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={p.size || 24} height={p.size || 24}>
      {type === "path" ? <path d={d} /> : null}
      {p.children}
    </svg>
  );
}
