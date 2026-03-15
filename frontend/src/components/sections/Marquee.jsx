const MARQUEE_ITEMS = ["Shield","Command","Capital","Intelligence","Resolve","Project Finance","Debt Restructuring","Special Situations","PPP","Infrastructure Advisory","Distressed M&A","Capital Structuring","GCC","Sub-Saharan Africa","Greenfield","Refinancing"];

export default function Marquee() {
  return (
    <section className="mg-marquee">
      <div className="mg-mq-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t,i)=>(
          <div key={i} className="mg-mq-item"><div className="mg-mq-glyph"/><span className="mg-mq-text">{t}</span></div>
        ))}
      </div>
    </section>
  );
}
