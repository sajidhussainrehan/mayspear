import { ScrollReveal } from "../common/ScrollReveal";

const GEO = [
  { status:"Headquarters", name:"London", desc:"Berkeley Square House, W1J 6BD. Primary operating base for UK infrastructure advisory, European special situations, and international mandate coordination.", img:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=75&fit=crop" },
  { status:"Priority One Market", name:"GCC and UAE", desc:"Abu Dhabi, Dubai, Riyadh. Sovereign infrastructure programmes, PPP pipelines, energy transition mandates. Key institutions: ADIA, Mubadala, ADQ, PIF, DEWA.", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=75&fit=crop" },
  { status:"Priority Three Market", name:"Africa", desc:"Pan-African infrastructure deficit. DFI-backed transactions, BII, African Development Bank, Proparco, DEG. Renewable energy, transport, water, and telecommunications infrastructure.", img:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=75&fit=crop" },
  { status:"Active Market", name:"North America", desc:"30 N Gould Street, Sheridan, Wyoming. US infrastructure bill beneficiaries, middle market project finance, state and municipal infrastructure.", img:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=75&fit=crop" },
];

export default function Geography() {
  return (
    <section id="geography">
      <div className="mg-geo-grid">
        {GEO.map((g,i)=>(
          <ScrollReveal key={i} className="mg-geo-city" style={{transitionDelay:`${i*65}ms`}}>
            <div className="mg-geo-city-photo"><img src={g.img} alt={g.name}/></div>
            <div className="mg-geo-city-overlay"/>
            <div className="mg-geo-city-content">
              <div className="mg-geo-status">{g.status}</div>
              <div className="mg-geo-name">{g.name}</div>
              <p className="mg-geo-desc">{g.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
