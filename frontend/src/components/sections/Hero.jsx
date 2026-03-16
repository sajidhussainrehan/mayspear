import ParticleCanvas from "../common/ParticleCanvas";

export default function Hero({ scrollTo, hoverProps }) {
  return (
    <section id="hero" className="mg-hero">
      <div className="mg-hero-bg">
        <img src="https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=1600&q=80&fit=crop" alt="Infrastructure" />
      </div>
      <ParticleCanvas />
      
      <div className="mg-hero-content">
        <div className="mg-hero-eyebrow">Infrastructure Advisory, Capital Structuring and Special Situations</div>
        
        <h1 className="mg-hero-h1">
          <span className="mg-h-line">Capital</span>
          <span className="mg-h-line">Structured.</span>
          <span className="mg-h-line">Situations <em style={{ fontStyle: "italic", color: "var(--brass2)" }}>Resolved.</em></span>
          <span className="mg-h-line">Transactions</span>
          <span className="mg-h-line">Closed.</span>
        </h1>

        <p className="mg-hero-body">
          Mayspear Global advises on the architecture and execution of complex capital transactions across infrastructure and special situations. Berkeley Square, London. Wyoming, United States.
        </p>

        <div className="mg-hero-stats">
          {[["5","Pillars"],["4","Markets"],["100M+","Mid-Market Focus"],["25+","Lender Panel"]].map(([n,l]) => (
            <div key={l} className="mg-hero-stat">
              <span className="mg-hero-stat-n">{n}</span>
              <span className="mg-hero-stat-l">{l}</span>
            </div>
          ))}
        </div>

        <div className="mg-hero-ctas">
          <button className="mg-btn-brass" onClick={() => scrollTo("#contact")} {...hoverProps}>
            <span>Request Mandate Discussion</span>
          </button>
          <button className="mg-btn-outline" onClick={() => scrollTo("#pillars")} {...hoverProps}>
            Our Five Pillars
          </button>
        </div>
      </div>
    </section>
  );
}
