export default function Footer({ scrollTo, hoverProps }) {
  return (
    <footer className="mg-footer">
      <div className="mg-container">
        <div className="mg-footer-grid">
          <div>
            <div className="mg-footer-brand">Mayspear<div className="mg-footer-brand-dot"/></div>
            <p className="mg-footer-desc">Specialist infrastructure advisory, capital structuring and special situations firm. Operating across GCC, UK, Africa and North America.</p>
            <p style={{fontFamily:"var(--mono)",fontSize:"0.56rem",letterSpacing:"0.15em",color:"var(--brass)",marginTop:"8px"}}>engagement@mayspear.com</p>
          </div>
          <div>
            <div className="mg-footer-col-h">Five Pillars</div>
            <ul className="mg-footer-links">
              {["Shield","Command","Capital","Intelligence","Resolve"].map(p=><li key={p}><a onClick={()=>scrollTo("#pillars")} {...hoverProps}>{p}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="mg-footer-col-h">Markets</div>
            <ul className="mg-footer-links">
              {["GCC and UAE","United Kingdom","Africa","North America"].map(m=><li key={m}><a onClick={()=>scrollTo("#geography")} {...hoverProps}>{m}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="mg-footer-col-h">Contact</div>
            <ul className="mg-footer-links">
              <li><a onClick={() => scrollTo("#contact")} {...hoverProps}>Request Mandate Discussion</a></li>
              <li><a href="mailto:engagement@mayspear.com" {...hoverProps}>engagement@mayspear.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mg-footer-bottom">
          <p className="mg-footer-legal">Mayspear Global does not hold FCA authorisation, does not manage client funds, does not provide investment advice and does not act as a fund manager. All advisory activities are carried out on an unregulated basis. Mayspear Global operates as an advisory and capital structuring firm. It does not hold or deploy capital on behalf of clients and does not act as an investment manager. Nothing on this website constitutes investment advice, a financial promotion, or a solicitation to invest. Mayspear Global LLC is registered in the State of Wyoming, United States. The firm operates from Berkeley Square House, Berkeley Square, London W1J 6BD. Copyright 2026 Mayspear Global. All rights reserved.</p>
          <div className="mg-footer-copy">Copyright 2026 Mayspear Global</div>
        </div>
      </div>
    </footer>
  );
}
