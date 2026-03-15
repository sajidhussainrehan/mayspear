import { TiltCard, ScrollReveal } from "../common/ScrollReveal";

const GAP_CARDS = [
  { n:"01", t:"Infrastructure transactions fail at the capital markets interface.", d:"Sponsors with government-backed projects, committed equity, and completed feasibility studies cannot reach financial close because the debt proposition is not bankable. The gap is not capital it is structuring quality. Mayspear designs the capital stack, prepares the lender proposition, and manages the institutional placement from first approach to financial close." },
  { n:"02", t:"Companies reach crisis before capital restructuring advice is sought.", d:"The distress window that produces the best outcomes for all parties is not administration. It is the six to eighteen months before lenders lose patience, when the capital structure can be renegotiated, new money can be introduced, and strategic options are still open. Most companies wait until those options have closed. Mayspear advises at the point where intervention still works." },
  { n:"03", t:"Buyers of distressed assets lack a reliable source of pre-qualified opportunities.", d:"Strategic and financial buyers seeking acquisition opportunities in distressed or underperforming mid-market companies operate in a market with no reliable origination. The best opportunities are identified before a formal process, at the point where the seller has not yet appointed advisors and the valuation reflects reality rather than an optimistic information memorandum." },
];

export default function Gap() {
  return (
    <section id="gap" className="mg-gap">
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">The Problem We Solve</div>
          <h2 className="mg-sec-h">Three Gaps.<br/><em>One Firm.</em></h2>
        </ScrollReveal>
        <div className="mg-gap-grid">
          {GAP_CARDS.map((c, i) => (
            <TiltCard key={i} className="mg-gap-card mg-rv">
              <div className="mg-gap-card-num">{c.n}</div>
              <h3 className="mg-gap-card-t">{c.t}</h3>
              <p className="mg-gap-card-d">{c.d}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
