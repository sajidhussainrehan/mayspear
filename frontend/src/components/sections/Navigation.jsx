export default function Navigation({ navScrolled, mobileOpen, setMobileOpen, scrollTo, hoverProps }) {
  const navLinks = ["#news","#services","#pillars","#sectors","#serve","#approach","#intelligence","#contact"];
  
  return (
    <>
      <nav className={`mg-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="mg-nav-brand" onClick={() => scrollTo("#hero")} {...hoverProps}>
          Mayspear <div className="mg-nav-brand-mark" />
        </div>
        <ul className="mg-nav-links">
          {navLinks.map((href, i) => (
            <li key={i}><a onClick={() => scrollTo(href)} {...hoverProps}>{href.slice(1).charAt(0).toUpperCase()+href.slice(2)}</a></li>
          ))}
        </ul>
        <a className="mg-nav-cta" onClick={() => scrollTo("#contact")} {...hoverProps}>Request Mandate Discussion</a>
        <div className="mg-nav-burger" onClick={() => setMobileOpen(p => !p)} {...hoverProps}>
          <span/><span/><span/>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mg-nav-mobile ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((href,i)=>(
          <a key={i} onClick={() => scrollTo(href)} {...hoverProps}>{href.slice(1).charAt(0).toUpperCase()+href.slice(2)}</a>
        ))}
      </div>
    </>
  );
}
