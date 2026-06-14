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
              <p className="mg-manifesto-col-text">Mayspear Global is a principal focused capital group specializing in infrastructure deployment and special situations restructuring. We originate capital, structure transactions, and execute outcomes as co-investors alongside institutional partners. 

We deploy capital across verticals globally, not as advisors, but as equity and credit participants in the transactions we build.</p>
              <p className="mg-manifesto-col-text">Two-Discipline Structure:
Our work spans institutional debt placement and capital execution for infrastructure assets, and principal restructuring and capital solutions for mid-market companies under financial pressure. In both disciplines, the same principle drives outcomes: capital deployment quality. The  difference between a transaction that closes and capital that compounds.</p>
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
