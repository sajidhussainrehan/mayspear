import { ScrollReveal } from "../common/ScrollReveal";

const INTEL_CARDS = [
  { cat:"Special Situations", t:"The Pre-Distress Window: Why Mid-Market Companies Leave Capital on the Table", img:"/1.png" },
  { cat:"GCC Infrastructure", t:"Infrastructure Debt Markets in the GCC: Where Capital Is Moving in 2026", img:"/2.png" },
  { cat:"Capital Structuring", t:"Structuring for Lenders: What Separates Bankable from Unbankable Infrastructure Transactions", img:"/3.jpeg" },
  { cat:"Distressed M&A", t:"The Buyer's Advantage in Distressed Mid-Market Situations", img:"/5.jpeg" },
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
