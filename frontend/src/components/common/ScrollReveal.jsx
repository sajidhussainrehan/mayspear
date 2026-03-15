import { useRef } from "react";
import { useTilt } from "../../hooks/useUtils";

export function TiltCard({ className, children, style }) {
  const ref = useRef(null);
  useTilt(ref);
  return <div ref={ref} className={`mg-tilt ${className}`} style={style}>{children}</div>;
}

export function ScrollReveal({ tag: Tag = "div", className = "", children, style, delay }) {
  return <Tag className={`mg-rv ${className}`} style={delay ? { transitionDelay: delay } : style}>{children}</Tag>;
}
