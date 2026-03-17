import { ScrollReveal } from "../common/ScrollReveal";

const RESOLVE_SERVICES = [
  { num:"01 / Four Service Lines", t:"Pre-Distress Identification and Buyer Matching", d:"Mayspear identifies companies exhibiting early financial deterioration signals before those signals become public and before a formal distress process is required. Deteriorating covenant headroom, declining interest cover, management turnover, reduction in capex, and changes in banking relationships are observable signals. Mayspear introduces these companies to strategic buyers, financial sponsors, and consolidators at the point where the transaction can be structured cooperatively." },
  { num:"02 / Four Service Lines", t:"Distressed Capital Restructuring", d:"For companies under financial pressure that have not yet entered a formal insolvency process, Resolve provides capital restructuring advisory that examines the full range of structural options: covenant renegotiation, maturity extension, payment-in-kind conversion, partial debt-for-equity exchange, and new money introduction. Mayspear structures the solution and coordinates with lenders and legal advisers through the negotiation." },
  { num:"03 / Four Service Lines", t:"Sell-Side Process Management", d:"Running a structured sale process for a distressed or underperforming company requires a different discipline from an optimistic sale process. Buyers know the situation. The information environment is compressed and controlled. Mayspear manages the process with the company's board as the mandate holder. We identify buyers who can execute on a compressed timeline, manage the information room, conduct the negotiation, and present the outcome clearly." },
  { num:"04 / Four Service Lines", t:"Buy-Side Advisory and Acquisition Structuring", d:"Acquiring a distressed or underperforming business is not a standard acquisition. The valuation is uncertain because the information quality is lower than in a normal sale process. Mayspear advises acquirers through this process: valuation under distress conditions, capital structure analysis, downside scenario modelling, and transaction structuring for the acquisition and the post-acquisition business." },
];

export default function ResolveDepth() {
  return (
    <section id="resolve-depth" className="mg-resolve-depth">
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label" style={{color:"var(--resolve-acc)"}}>Resolve Special Situations</div>
          <h2 className="mg-sec-h" style={{color:"var(--stone2)"}}>When the Options<br/>Are <em style={{color:"var(--resolve-acc2)"}}>Narrowing</em></h2>
          <p style={{fontFamily:"var(--body)",fontSize:"1rem",color:"rgba(200,191,176,0.5)",lineHeight:"1.82",maxWidth:"700px",marginTop:"20px"}}>Resolve is Mayspear's special situations pillar. It exists because the advice available to mid-market companies under financial pressure is inadequate. Accountants tell companies what their position is. Lawyers tell companies what their obligations are. Nobody tells a company's board what its capital structure options actually are and what each of those options means for the shareholders, the management, and the lenders. Resolve does that. It does not soften the analysis.</p>
        </ScrollReveal>
        <div className="mg-resolve-grid">
          <ScrollReveal className="mg-resolve-photo">
            <img src="/7.jpeg" alt="Boardroom"/>
            <div className="mg-resolve-photo-overlay"/>
          </ScrollReveal>
          <ScrollReveal className="mg-resolve-right">
            {RESOLVE_SERVICES.map((s,i)=>(
              <div key={i} className="mg-resolve-service">
                <div className="mg-resolve-service-num">{s.num}</div>
                <div className="mg-resolve-service-t">{s.t}</div>
                <p className="mg-resolve-service-d">{s.d}</p>
                <div className="mg-resolve-bar"/>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
