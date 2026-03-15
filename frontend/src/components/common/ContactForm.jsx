import { useState } from "react";
import { createEnquiry } from "../../services/api";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:"", firm:"", role:"", email:"", type:"", size:"", sector:"", geo:"", timing:"", overview:"" });
  
  const handle = async (e) => { 
    e.preventDefault(); 
    setSubmitting(true);
    try {
      await createEnquiry(form);
      setSubmitted(true); 
      setTimeout(() => { 
        setSubmitted(false); 
        setForm({ name:"",firm:"",role:"",email:"",type:"",size:"",sector:"",geo:"",timing:"",overview:"" }); 
      }, 3500); 
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  const inp = (f) => ({ value: form[f], onChange: (e) => setForm(p => ({...p, [f]: e.target.value})) });
  
  return (
    <form className="mg-cform" onSubmit={handle}>
      <div className="mg-f-row">
        <div className="mg-f-field"><label className="mg-f-lbl">Full Name</label><input type="text" className="mg-f-in" placeholder="Your full name" required {...inp("name")} /></div>
        <div className="mg-f-field"><label className="mg-f-lbl">Firm</label><input type="text" className="mg-f-in" placeholder="Organisation name" {...inp("firm")} /></div>
      </div>
      <div className="mg-f-row">
        <div className="mg-f-field"><label className="mg-f-lbl">Role</label><input type="text" className="mg-f-in" placeholder="Your title" {...inp("role")} /></div>
        <div className="mg-f-field"><label className="mg-f-lbl">Email</label><input type="email" className="mg-f-in" placeholder="your@email.com" required {...inp("email")} /></div>
      </div>
      <div className="mg-f-field"><label className="mg-f-lbl">Enquiry Type</label>
        <select className="mg-f-sel" {...inp("type")}>
          <option value="" disabled>Select enquiry type</option>
          <option>Infrastructure Advisory</option>
          <option>Special Situations</option>
          <option>Both Infrastructure and Special Situations</option>
        </select>
      </div>
      <div className="mg-f-row">
        <div className="mg-f-field"><label className="mg-f-lbl">Transaction Size</label>
          <select className="mg-f-sel" {...inp("size")}>
            <option value="" disabled>Approximate size</option>
            <option>100M to 500M</option><option>500M to 2B</option><option>2B to 10B</option><option>10B to 100B</option><option>Above 100B</option>
          </select>
        </div>
        <div className="mg-f-field"><label className="mg-f-lbl">Sector</label>
          <select className="mg-f-sel" {...inp("sector")}>
            <option value="" disabled>Sector</option>
            <option>Energy and Power</option><option>Transport and Logistics</option><option>Water and Utilities</option><option>Social Infrastructure</option><option>Digital Infrastructure</option><option>Renewable Energy</option><option>Special Situations</option><option>Other</option>
          </select>
        </div>
      </div>
      <div className="mg-f-row">
        <div className="mg-f-field"><label className="mg-f-lbl">Geography</label>
          <select className="mg-f-sel" {...inp("geo")}>
            <option value="" disabled>Primary market</option>
            <option>GCC and UAE</option><option>United Kingdom</option><option>Africa</option><option>North America</option><option>Multi-Jurisdiction</option>
          </select>
        </div>
        <div className="mg-f-field"><label className="mg-f-lbl">Timing</label>
          <select className="mg-f-sel" {...inp("timing")}>
            <option value="" disabled>Expected timeline</option>
            <option>Immediate</option><option>Within 3 months</option><option>3 to 12 months</option><option>Over 12 months</option>
          </select>
        </div>
      </div>
      <div className="mg-f-field"><label className="mg-f-lbl">Transaction Overview</label><textarea className="mg-f-ta" placeholder="Brief description of the transaction or situation" {...inp("overview")} /></div>
      <button type="submit" className="mg-f-btn" disabled={submitting} style={submitted ? {background:"#5C4920"} : {}}>
        {submitting ? "Submitting..." : submitted ? "Enquiry Received" : "Submit Mandate Enquiry"}
      </button>
      <p className="mg-f-note">Mayspear Global does not hold FCA authorisation, does not manage client funds, and does not provide investment advice. All advisory activities are carried out on an unregulated basis. Enquiries are treated as strictly confidential.</p>
    </form>
  );
}
