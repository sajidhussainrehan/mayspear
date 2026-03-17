import { ScrollReveal } from "../common/ScrollReveal";

const SECTORS = [
  { name:"Energy and Power", sub:"Gas, thermal, storage, grid", img:"/4.jpeg" },
  { name:"Transport and Logistics", sub:"Ports, rail, roads, airports", img:"/5.jpeg" },
  { name:"Water and Utilities", sub:"Treatment, distribution, waste", img:"/6.jpeg" },
  { name:"Social Infrastructure", sub:"Healthcare, education, housing", img:"7.jpeg" },
  { name:"Digital Infrastructure", sub:"Data centres, fibre, towers", img:"3.jpeg" },
  { name:"Renewable Energy and Transition", sub:"Solar, wind, hydrogen, storage", img:"1.png" },
  { name:"Special Situations", sub:"All sectors, 100m to 100bn enterprise value", img:"2.png" },
];

export default function Sectors() {
  return (
    <section id="sectors" className="mg-sectors">
      <div className="mg-container">
        <div className="mg-sectors-head">
          <ScrollReveal>
            <div className="mg-sec-label">Sector Coverage</div>
            <h2 className="mg-sec-h">Seven Sectors.<br/><em>One Standard.</em></h2>
          </ScrollReveal>
          <ScrollReveal className="mg-sectors-r">Mayspear operates across the full range of infrastructure asset classes and special situations. Six sectors cover the physical infrastructure economy. The seventh covers the commercial and corporate economy at mid-market scale, where financial pressure and strategic change create the transactions that define outcomes.</ScrollReveal>
        </div>
      </div>
      <div style={{maxWidth:"100%"}}>
        <div className="mg-sectors-grid">
          {SECTORS.map((s,i)=>(
            <ScrollReveal key={i} className="mg-sector-item" style={{transitionDelay:`${i*65}ms`}}>
              <div className="mg-sector-photo"><img src={s.img} alt={s.name}/></div>
              <div className="mg-sector-grad"/>
              <div className="mg-sector-content">
                <div className="mg-sector-name">{s.name}</div>
                <div className="mg-sector-sub">{s.sub}</div>
              </div>
            </ScrollReveal>
          ))}
          <ScrollReveal className="mg-sector-item" style={{background:"var(--ch4)"}}>
            <div className="mg-sector-grad"/>
            <div className="mg-sector-content" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",textAlign:"center"}}>
              <div>
                <div className="mg-sector-name" style={{fontSize:"0.9rem",color:"var(--brass)"}}>engagement@mayspear.com</div>
                <div className="mg-sector-sub" style={{marginTop:"6px"}}>Discuss a mandate</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
