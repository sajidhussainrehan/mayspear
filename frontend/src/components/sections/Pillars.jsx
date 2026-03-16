import { TiltCard, ScrollReveal } from "../common/ScrollReveal";

const PILLARS = [
  { num:"01 / Four Pillars", tag:"Transaction Structuring", name:"Shield", img:"https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=75&fit=crop", resolve:false,
    desc:"Transaction structuring and risk architecture for infrastructure mandates. We design the debt stack, construct the security package, and build the intercreditor framework before the first lender conversation.",
    deliverables:["Debt stack design and quantum analysis","Security package construction","Intercreditor framework advisory","Covenant architecture and lender reporting","Financial model review and stress testing","Lender-ready documentation preparation"] },
  { num:"02 / Four Pillars", tag:"Mandate Execution", name:"Command", img:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=75&fit=crop", resolve:false,
    desc:"Mandate origination, lender identification and transaction execution. We source the right capital for infrastructure transactions across bank debt, institutional debt, development finance, export credit and hybrid instruments.",
    deliverables:["Lender identification and targeting","Information memorandum preparation","Bank and institutional debt placement","Development finance institution access","Export credit agency structuring","Mandate management through to close"] },
  { num:"03 / Four Pillars", tag:"Capital Structuring", name:"Capital", img:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=75&fit=crop", resolve:false,
    desc:"Infrastructure capital structuring for sovereign, institutional and private sponsors. Greenfield project finance, brownfield refinancings, PPP structures, asset-backed facilities and construction-phase financing.",
    deliverables:["Greenfield project finance structuring","Brownfield refinancing and recapitalisation","PPP and concession-backed structures","Asset-backed facility design","Construction-phase and bridge financing","DFI blended finance co-structuring"] },
  { num:"04 / Four Pillars", tag:"Market Intelligence", name:"Intelligence", img:"https://images.unsplash.com/photo-1532408840957-031d8034aeef?w=800&q=75&fit=crop", resolve:false,
    desc:"Infrastructure market intelligence, pipeline origination support and deal flow advisory. Sector coverage across GCC, Sub-Saharan Africa, North America and UK.",
    deliverables:["Pipeline identification and origination","Market intelligence subscriptions","Sector and geography coverage reports","Sponsor and developer deal flow advisory","Public sector bankability advisory","Lender appetite and market conditions analysis"] },
];

export default function Pillars() {
  return (
    <section id="pillars" className="mg-pillars">
      <div className="mg-container">
        <div className="mg-pillars-intro">
          <ScrollReveal>
            <div className="mg-sec-label">Four Pillars</div>
            <h2 className="mg-sec-h">The Architecture<br/>of <em>Every</em> Mandate</h2>
          </ScrollReveal>
          <ScrollReveal className="mg-pillars-intro-r">Mayspear's advisory capability is organised across four service pillars. Each pillar addresses the structural, origination, capital, and intelligence requirements of infrastructure transactions. All four operate under the same discipline: no retainer until a transaction closes.</ScrollReveal>
        </div>
      </div>
      <div className="mg-container">
        <div className="mg-pillars-grid mg-rv">
          {PILLARS.map((p,i)=>(
            <TiltCard key={i} className={`mg-pillar-card${p.resolve?" resolve-card":""}`}>
              <div className="mg-pillar-photo"><img src={p.img} alt={p.name}/></div>
              <div className="mg-pillar-overlay"/>
              <div className="mg-pillar-content">
                <div className="mg-pillar-num">{p.num}</div>
                <div className="mg-pillar-tag">{p.tag}</div>
                <div className="mg-pillar-name">{p.name}</div>
                <p className="mg-pillar-desc">{p.desc}</p>
                <ul className="mg-pillar-deliverables">{p.deliverables.map((d,j)=><li key={j}>{d}</li>)}</ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
