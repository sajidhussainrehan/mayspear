import { ScrollReveal } from "../common/ScrollReveal";

const GEO = [
  { status:"Strategic Sector", name:"Energy & Refineries", desc:"Downstream and upstream energy infrastructure, refining capacity, and storage terminals. Advising on capital intensive energy transition projects.", img:"/images/infrastructure/oil_rig.jpeg" },
  { status:"Priority Asset", name:"Toll Roads & Transport", desc:"Major arterial transport corridors, toll road concessions, and multi-modal transport hubs. Structuring for long-term yield and public-private partnerships.", img:"/images/infrastructure/coastal_city.png" },
  { status:"Key Infrastructure", name:"Ports & Logistics", desc:"Deepwater ports, container terminals, and integrated logistics parks. Enhancing global trade connectivity through structured capital and operational efficiency.", img:"/images/infrastructure/port_plane.jpeg" },
  { status:"Industrial Growth", name:"Marine Infrastructure", desc:"Shipyards, drydocks, and specialized maritime facilities. Supporting the backbone of international shipping and heavy industrial development.", img:"/images/infrastructure/shipyard.jpeg" },
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
