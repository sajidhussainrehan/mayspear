import { TiltCard, ScrollReveal } from "../common/ScrollReveal";
import ServeIcon from "../common/ServeIcon";

const SERVE_CARDS = [
  { icon:"bars", t:"Infrastructure Sponsors and Developers", d:"Project companies, independent power producers, concession holders, and infrastructure developers with transactions at feasibility stage or approaching financial close that require institutional debt structuring and placement.", q:'"We have a signed concession and committed equity. We need the debt structure and the right lenders, quickly."', resolve:false },
  { icon:"card", t:"Government and Public Sector Bodies", d:"Ministries of finance, PPP units, infrastructure authorities, and state-owned enterprises preparing infrastructure transactions for private finance and requiring advisory on bankability, capital structure, and lender engagement strategy.", q:'"We have government approval and project definition. We need to understand what the private capital market will require before we go to market."', resolve:false },
  { icon:"circle", t:"Private Equity and Institutional Investors", d:"Private equity firms, infrastructure funds, and institutional investors acquiring or recapitalising infrastructure assets who require capital structuring advisory, lender introduction, and debt placement.", q:'"We have agreed the equity terms. The debt structuring and lender process needs to run in parallel, not sequentially."', resolve:false },
  { icon:"layers", t:"Development Finance Institutions", d:"DFIs and multilateral organisations seeking transaction advisory, co-financing structure support, and private sector capital introduction for infrastructure transactions in their programme geographies.", q:'"We have a DFI facility agreed. We need a private sector co-financing structure and a credible placement process for the institutional tranche."', resolve:false },
  { icon:"warn", t:"Distressed Companies Seeking Resolution", d:"Mid-market companies with enterprise values between 100 million and 100 billion where the debt structure is under pressure, lender relationships have deteriorated, or the business requires new capital.", q:'"The bank has instructed its solicitors. We have six weeks. We need someone who understands distressed capital structures to tell us what our options actually are."', resolve:true },
  { icon:"link", t:"Strategic Buyers and Special Situations Investors", d:"Strategic acquirers and financial investors seeking curated access to pre-distress and distressed mid-market acquisition opportunities, identified before a formal process.", q:'"We want to see the situations before they go to a formal process. By the time there is an information memorandum, the best opportunities are already taken."', resolve:true },
];

export default function Serve({ hoverProps }) {
  return (
    <section id="serve" className="mg-serve">
      <div className="mg-container">
        <div className="mg-serve-head">
          <ScrollReveal>
            <div className="mg-sec-label">Who We Serve</div>
            <h2 className="mg-sec-h">Six Client<br/><em>Segments</em></h2>
          </ScrollReveal>
          <ScrollReveal className="mg-serve-r">Mayspear works with clients at the intersection of capital and complexity. Infrastructure sponsors who need debt structured and placed. Governments preparing bankable transactions. Institutional investors requiring capital structuring for infrastructure assets. Distressed companies whose options are narrowing. Buyers who want access to pre-qualified special situations deal flow.</ScrollReveal>
        </div>
        <div className="mg-serve-grid">
          {SERVE_CARDS.map((c,i)=>(
            <TiltCard key={i} className="mg-serve-card mg-rv" style={c.resolve ? {background:"var(--resolve2)"} : {}} >
              {c.resolve && <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"var(--resolve-acc)"}}/>}
              <ServeIcon type={c.icon} resolve={c.resolve}/>
              <div className="mg-serve-t" style={c.resolve?{color:"var(--stone2)"}:{}}>{c.t}</div>
              <p className="mg-serve-d" style={c.resolve?{color:"rgba(200,191,176,0.45)"}:{}}>{c.d}</p>
              <div className="mg-serve-quote" style={c.resolve?{borderLeftColor:"rgba(196,80,58,0.4)",color:"var(--stone)"}:{}}>{c.q}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
