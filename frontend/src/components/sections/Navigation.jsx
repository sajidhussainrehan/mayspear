import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation({ navScrolled, mobileOpen, setMobileOpen, scrollTo, hoverProps }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navConfig = [
    { path: "/pillars", label: "Pillars" },
    { path: "/sectors", label: "Sectors" },
    { path: "/serve", label: "Serve" },
    { path: "/approach", label: "Approach" },
    { path: "/intelligence", label: "Intelligence" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact" }
  ];

  const handleNav = (path) => {
    setMobileOpen(false);
    if (location.pathname === "/" && path.startsWith("#")) {
      // If on home page and it's a hash link, scroll
      scrollTo(path);
    } else {
      // Otherwise navigate to the page
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  return (
    <>
      <nav className={`mg-nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="mg-nav-brand" onClick={() => navigate("/")} {...hoverProps}>
          Mayspear <div className="mg-nav-brand-mark" />
        </div>
        <ul className="mg-nav-links">
          {navConfig.map((item, i) => (
            <li key={i}>
              <a onClick={() => handleNav(item.path)} {...hoverProps}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="mg-nav-cta" onClick={() => handleNav("/contact")} {...hoverProps}>
          Request Mandate Discussion
        </a>
        <div className="mg-nav-burger" onClick={() => setMobileOpen(p => !p)} {...hoverProps}>
          <span/><span/><span/>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mg-nav-mobile ${mobileOpen ? "open" : ""}`}>
        <div className="mg-nav-mobile-close" onClick={() => setMobileOpen(false)} {...hoverProps}>×</div>
        {navConfig.map((item, i) => (
          <a key={i} onClick={() => handleNav(item.path)} {...hoverProps}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
