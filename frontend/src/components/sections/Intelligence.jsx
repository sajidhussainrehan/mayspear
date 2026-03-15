import { ScrollReveal } from "../common/ScrollReveal";

const INTEL_CARDS = [
  { cat:"Special Situations", t:"The Pre-Distress Window: Why Mid-Market Companies Leave Capital on the Table", img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75&fit=crop" },
  { cat:"GCC Infrastructure", t:"Infrastructure Debt Markets in the GCC: Where Capital Is Moving in 2026", img:"https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=600&q=75&fit=crop" },
  { cat:"Capital Structuring", t:"Structuring for Lenders: What Separates Bankable from Unbankable Infrastructure Transactions", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75&fit=crop" },
  { cat:"Distressed M&A", t:"The Buyer's Advantage in Distressed Mid-Market Situations", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75&fit=crop" },
];

export default function Intelligence() {
  return (
    <section id="intelligence" className="mg-intelligence">
      <div className="mg-container">
        <div className="mg-intel-head">
          <ScrollReveal>
            <div className="mg-sec-label">Market Intelligence</div>
            <h2 className="mg-sec-h">Four Insights<br/>from <em>Active Markets</em></h2>
          </ScrollReveal>
        </div>
      </div>
      <div style={{maxWidth:"100%"}}>
        <div className="mg-intel-grid">
          {INTEL_CARDS.map((c,i)=>(
            <ScrollReveal key={i} className="mg-intel-card" style={{transitionDelay:`${i*65}ms`}}>
              <div className="mg-intel-photo"><img src={c.img} alt=""/></div>
              <div className="mg-intel-grad"/>
              <div className="mg-intel-content">
                <div className="mg-intel-cat">{c.cat}</div>
                <div className="mg-intel-t">{c.t}</div>
                <div className="mg-intel-arrow">Read analysis</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
