import { ScrollReveal } from "../common/ScrollReveal";

export default function Manifesto() {
  return (
    <section id="manifesto" className="mg-manifesto">
      <div className="mg-manifesto-grid">
        <ScrollReveal className="mg-manifesto-left">
          <div className="mg-manifesto-wm">MG</div>
          <div className="mg-manifesto-content">
            <div className="mg-sec-label">Our Position</div>
            <blockquote className="mg-manifesto-quote">"Infrastructure transactions fail at the capital markets interface. Companies reach the point of no return before anyone with structuring capability is in the room. Mayspear exists to change both outcomes."</blockquote>
            <div className="mg-manifesto-cols">
              <p className="mg-manifesto-col-text">Mayspear Global is a specialist infrastructure advisory, capital structuring and special situations firm. We operate at the point where capital decisions determine whether transactions complete and whether companies survive. We do not manage funds. We do not hold regulated permissions. We advise on structure, originate capital, and execute outcomes.</p>
              <p className="mg-manifesto-col-text">Our work spans two distinct but related disciplines: the architecture and placement of institutional debt for infrastructure transactions, and the advisory and execution of capital restructuring and corporate transactions for mid-market companies under financial pressure. In both disciplines, the same principle applies: the quality of the structural thinking is the difference between a transaction that closes and one that does not.</p>
            </div>
          </div>
        </ScrollReveal>
        <div className="mg-manifesto-right">
          <div className="mg-manifesto-photo"><img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80&fit=crop" alt="City" /></div>
          <div className="mg-manifesto-photo-fade" />
        </div>
      </div>
    </section>
  );
}
