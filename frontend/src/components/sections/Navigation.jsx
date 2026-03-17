import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation({ navScrolled, mobileOpen, setMobileOpen, scrollTo, hoverProps }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navLinks = ["#services", "#pillars", "#sectors", "#serve", "#approach", "#intelligence", "#news", "#blogs", "#contact"];

  const handleNav = (href) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      scrollTo(href);
    }
  };
  
  return (
    <>
      <nav className={`mg-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="mg-nav-brand" onClick={() => handleNav("#hero")} {...hoverProps}>
          Mayspear <div className="mg-nav-brand-mark" />
        </div>
        <ul className="mg-nav-links">
          {navLinks.map((href, i) => (
            <li key={i}><a onClick={() => handleNav(href)} {...hoverProps}>{href.slice(1).charAt(0).toUpperCase()+href.slice(2)}</a></li>
          ))}
        </ul>
        <a className="mg-nav-cta" onClick={() => handleNav("#contact")} {...hoverProps}>Request Mandate Discussion</a>
        <div className="mg-nav-burger" onClick={() => setMobileOpen(p => !p)} {...hoverProps}>
          <span/><span/><span/>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mg-nav-mobile ${mobileOpen ? "open" : ""}`}>
        <div className="mg-nav-mobile-close" onClick={() => setMobileOpen(false)} {...hoverProps}>×</div>
        {navLinks.map((href,i)=>(
          <a key={i} onClick={() => handleNav(href)} {...hoverProps}>{href.slice(1).charAt(0).toUpperCase()+href.slice(2)}</a>
        ))}
      </div>
    </>
  );
}
