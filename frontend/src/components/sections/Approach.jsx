import { ScrollReveal } from "../common/ScrollReveal";

const APPROACH_STEPS = [
  { n:"Step One", t:"Mandate Assessment", d:"Every mandate begins with an honest assessment of whether the transaction is executable and whether Mayspear is the right advisor to execute it. We assess capital structure viability, sponsor or company credibility, and realistic timeline before accepting a mandate. We decline mandates that are not executable.", track:"Infrastructure and Special Situations" },
  { n:"Step Two", t:"Structure Design", d:"For infrastructure mandates: capital stack design, financial modelling, and security architecture before the first lender contact. For special situations: restructuring solution design, new money identification, or sale process preparation, depending on the mandate.", track:"Infrastructure and Special Situations" },
  { n:"Step Three", t:"Institutional Engagement", d:"For infrastructure mandates: targeted lender outreach, information memorandum distribution, and parallel workstream management. For sell-side special situations: buyer identification, process management, and information management.", track:"Infrastructure and Special Situations" },
  { n:"Step Four", t:"Negotiation and Documentation", d:"Term sheet negotiation, credit committee preparation, and coordination with legal advisers through to execution documents. Mayspear remains active throughout to protect the economic terms agreed in negotiation.", track:"Infrastructure" },
  { n:"Step Five", t:"Financial Close or Transaction Completion", d:"Mayspear earns its advisory fees on completion of the transaction, not on engagement. We do not charge retainers on standard mandates. The alignment of our fee with the outcome of the transaction is how we ensure that the advice we give produces results.", track:"Infrastructure and Special Situations" },
];

export default function Approach() {
  return (
    <section id="approach" className="mg-approach">
      <div className="mg-container">
        <ScrollReveal>
          <div className="mg-sec-label">Transaction Approach</div>
          <h2 className="mg-sec-h">From First Conversation<br/>to <em>Completed</em> Transaction</h2>
        </ScrollReveal>
        <div className="mg-approach-grid">
          <ScrollReveal className="mg-approach-photo">
            <img src="https://assets.kpmg.com/is/image/kpmgcloud/translucent-shadow-of-a-man:cq5dam-web-656-656?wid=328&amp;hei=328" alt="Transaction"/>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mg-approach-steps">
              {APPROACH_STEPS.map((s,i)=>(
                <div key={i} className="mg-approach-step">
                  <div className="mg-approach-step-n">{s.n}</div>
                  <div className="mg-approach-step-t">{s.t}</div>
                  <p className="mg-approach-step-d">{s.d}</p>
                  <div className="mg-approach-track">{s.track}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
