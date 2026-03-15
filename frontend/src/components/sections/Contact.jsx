import { ScrollReveal } from "../common/ScrollReveal";
import ContactForm from "../common/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="mg-contact">
      <div className="mg-contact-grid">
        <ScrollReveal className="mg-contact-left">
          <div className="mg-contact-left-photo"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&fit=crop" alt=""/></div>
          <div className="mg-contact-left-overlay"/>
          <div className="mg-contact-left-content">
            <h2 className="mg-contact-left-h">Request a<br/><em style={{fontStyle:"italic",color:"var(--brass3)"}}>Mandate</em><br/>Discussion</h2>
            <p className="mg-contact-left-d">All enquiries are treated as strictly confidential. Initial discussions are without obligation. A member of the Mayspear team will respond within two business days.</p>
            <div className="mg-contact-offices">
              <div className="mg-contact-office">
                <div className="mg-contact-office-label">London</div>
                <div className="mg-contact-office-addr">Berkeley Square House<br/>Berkeley Square, London W1J 6BD</div>
              </div>
              <div className="mg-contact-office">
                <div className="mg-contact-office-label">Wyoming</div>
                <div className="mg-contact-office-addr">30 N Gould Street<br/>Sheridan, Wyoming WY 82801</div>
              </div>
            </div>
            <div className="mg-contact-email">engagement@mayspear.com</div>
          </div>
        </ScrollReveal>
        <ScrollReveal className="mg-contact-right">
          <div className="mg-sec-label">Mandate Enquiry</div>
          <h3 style={{fontFamily:"var(--serif)",fontSize:"1.8rem",fontWeight:300,color:"var(--text)",marginBottom:"32px"}}>Tell us about your transaction</h3>
          <ContactForm/>
        </ScrollReveal>
      </div>
    </section>
  );
}
