export default function ServeIcon({ type, resolve }) {
  const color = resolve ? "#C4503A" : "#B8964A";
  const icons = {
    bars: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><rect x="4" y="20" width="6" height="16"/><rect x="17" y="12" width="6" height="24"/><rect x="30" y="4" width="6" height="32"/><polyline points="7,20 20,12 33,4" strokeDasharray="2 2"/></svg>,
    card: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><rect x="4" y="8" width="32" height="24" rx="2"/><line x1="4" y1="18" x2="36" y2="18"/><circle cx="28" cy="26" r="4"/><line x1="12" y1="26" x2="20" y2="26"/></svg>,
    circle: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><circle cx="20" cy="20" r="14"/><circle cx="20" cy="20" r="6"/><line x1="6" y1="20" x2="14" y2="20"/><line x1="26" y1="20" x2="34" y2="20"/><line x1="20" y1="6" x2="20" y2="14"/><line x1="20" y1="26" x2="20" y2="34"/></svg>,
    layers: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><rect x="4" y="10" width="32" height="24" rx="2"/><path d="M4 20 L20 28 L36 20"/><circle cx="20" cy="10" r="5"/></svg>,
    warn: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><path d="M20 4 L36 36 L4 36 Z"/><line x1="20" y1="16" x2="20" y2="26"/><circle cx="20" cy="30" r="1.5" fill={color}/></svg>,
    link: <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.2"><circle cx="12" cy="20" r="6"/><circle cx="28" cy="20" r="6"/><line x1="18" y1="20" x2="22" y2="20"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="28" y1="8" x2="28" y2="14"/></svg>,
  };
  return <div className="mg-serve-icon">{icons[type]}</div>;
}
