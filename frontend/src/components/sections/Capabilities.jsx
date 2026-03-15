import { useState } from "react";
import { ScrollReveal } from "../common/ScrollReveal";

const TABS = [
  { label:"Project Finance Structuring", h:"Project Finance Structuring",
    body:"Project finance structuring is the discipline of building a capital structure that a lender can actually underwrite. The information memorandum that lands on a credit committee table is the product of months of financial modelling, security analysis, market comparable work, and lender relationship positioning. Mayspear manages that process from the initial bankability assessment through to financial close, managing multiple lender workstreams in parallel without the delay that comes from sequential negotiation. Our work spans greenfield projects at feasibility stage through to brownfield assets requiring refinancing at maturity. We structure across senior debt, mezzanine, equity bridge, and blended DFI facilities.",
    items:["Bankability assessment and feasibility-stage structuring advisory","Full financial model build and sensitivity analysis","Lender information memorandum preparation to institutional standard","Parallel lender workstream management","DFI co-financing structure integration","Term sheet negotiation and credit committee preparation support"] },
  { label:"Debt Restructuring", h:"Debt Restructuring and Recapitalisation",
    body:"When a company's debt service obligations have moved out of alignment with its operating reality, the question is not whether to restructure but when and how. The companies that achieve the best outcomes are those where the restructuring conversation begins before the lender has instructed enforcement solicitors. Mayspear advises on debt restructuring for companies with enterprise values between 100 million and 100 billion. We design the restructuring solution, model the outcomes for each stakeholder group, and coordinate the negotiation between the company, its lenders, and its legal advisers.",
    items:["Debt service capacity analysis and covenant headroom modelling","Lender negotiation support and restructuring proposal design","Debt-for-equity exchange structuring","New money identification and introduction","Intercreditor coordination across multiple lender groups","Board advisory throughout the restructuring process"] },
  { label:"Sell-Side Distressed", h:"Sell-Side Process Management for Distressed Companies",
    body:"A structured sale process for a distressed or underperforming business requires a different approach from a sale process conducted from a position of strength. Buyers know the situation. The information environment is compressed. The timeline is controlled by creditor patience rather than seller preference. Mayspear manages sell-side processes for distressed companies where the mandate holder is the company or its board.",
    items:["Buyer identification across strategic and financial acquirers","Information memorandum and process letter preparation","Management presentation preparation and coaching","Bid management and comparative evaluation","Negotiation support through to heads of terms","Close coordination with legal advisers"] },
  { label:"Buy-Side Special Situations", h:"Buy-Side Advisory and Special Situations Acquisition",
    body:"Acquiring a distressed or underperforming business requires a structured analytical process that is fundamentally different from a conventional acquisition. The valuation is inherently uncertain. The information quality is lower. The timeline is compressed. The downside scenarios are real. Mayspear advises acquirers, distressed debt buyers, and special situations investors evaluating target companies in this category.",
    items:["Target company valuation under distress conditions","Capital structure analysis and liability mapping","Downside scenario modelling and sensitisation","Transaction structuring for distressed acquisitions","Pre-distress opportunity origination","Post-acquisition capital structure advisory"] },
  { label:"Capital Intelligence", h:"Capital Intelligence and Mandate Origination",
    body:"Market intelligence in infrastructure capital markets is the difference between a mandate brought to the right lenders at the right moment and one that arrives late into a process where appetite has already been committed elsewhere. Mayspear maintains active coverage of institutional lender appetite, DFI programme pipelines, and infrastructure project development activity across GCC, Sub-Saharan Africa, North America, and the UK.",
    items:["Lender appetite mapping by sector and geography","DFI programme pipeline monitoring","Infrastructure project development activity tracking","Quarterly sector and geography capital markets reports","Investment committee preparation support","Capital structure optimisation advisory for retained clients"] },
  { label:"Mandate and Lender Coverage", h:"Mandate Origination and Lender Coverage",
    body:"Mayspear's institutional lender coverage spans 25 or more banks, private credit funds, development finance institutions, and infrastructure debt funds with active mandates across our four operating markets. Lender relationships are maintained through active deal flow, not passive contact management.",
    items:["25 or more institution lender panel across all geographies","Bank debt, institutional debt, DFI and hybrid instrument coverage","Appetite confirmation before mandate launch","Competitive tension management across parallel lender workstreams","Ongoing lender relationship maintenance between mandates","Export credit agency and multilateral access"] },
];

export default function Capabilities({ hoverProps }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="capabilities" className="mg-capabilities">
      <div className="mg-container">
        <ScrollReveal className="mg-caps-head">
          <div className="mg-sec-label">Capabilities in Depth</div>
          <h2 className="mg-sec-h">Six Areas of<br/><em>Specific Expertise</em></h2>
        </ScrollReveal>
        <div className="mg-tabs-nav mg-rv">
          {TABS.map((t,i)=>(
            <button key={i} className={`mg-tab-btn${activeTab===i?" active":""}`} onClick={()=>setActiveTab(i)} {...hoverProps}>{t.label}</button>
          ))}
        </div>
        {TABS.map((t,i)=>(
          <div key={i} className={`mg-tab-panel${activeTab===i?" active":""}`}>
            <h3 className="mg-tab-panel-h">{t.h}</h3>
            <div className="mg-tab-panel-body">{t.body}</div>
            <div className="mg-tab-panel-list">{t.items.map((it,j)=><div key={j} className="mg-tab-panel-li">{it}</div>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
