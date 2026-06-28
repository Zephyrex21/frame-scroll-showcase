import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function useInView() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

const inputBase = {
  width:'100%', background:'transparent', border:'none',
  borderBottom:'1px solid var(--gold-border)',
  padding:'14px 0', fontFamily:'var(--font-body)',
  fontSize:'14px', color:'var(--ivory)', fontWeight:300,
  letterSpacing:'0.04em', outline:'none',
  transition:'border-color 0.3s ease',
};

export default function CTA({ watch }) {
  const [sectionRef, vis] = useInView();
  const [form,   setForm]   = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');
  const [focused,setFocused]= useState(null);
  const [btnHov, setBtnHov] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      await axios.post('/api/enquiry', form);
      setStatus('success');
      setForm({ name:'', email:'', message:'' });
    } catch { setStatus('error'); }
  };

  return (
    <section id="enquiry" ref={sectionRef} style={{
      background:'var(--bg-void)', borderTop:'1px solid var(--gold-border)',
      padding:'140px 48px', transition:'var(--theme-transition)',
    }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'100px', alignItems:'start' }}>

        {/* Left: copy */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'36px', opacity: vis ? 1:0, transition:'opacity 0.8s ease' }}>
            <div style={{ width: vis ? '40px':'0', height:'1px', background:'var(--gold)', transition:'width 1s ease 0.1s' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.35em', color:'var(--gold)', textTransform:'uppercase' }}>Private Enquiry</span>
          </div>
          <h2 style={{
            fontFamily:'var(--font-display)', fontSize:'clamp(36px,4.5vw,58px)', fontWeight:300,
            color:'var(--ivory)', lineHeight:1.15, letterSpacing:'0.04em', marginBottom:'32px',
            opacity: vis ? 1:0, transform: vis ? 'none':'translateY(24px)',
            transition:'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}>
            Reserve Your<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Imperion Chronographe</em>
          </h2>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'14px', lineHeight:1.8, color:'var(--ivory-muted)', fontWeight:300, maxWidth:'400px', marginBottom:'40px', opacity: vis ? 1:0, transition:'opacity 0.8s ease 0.2s' }}>
            The Imperion Chronographe is available exclusively through our private boutiques and authorised AURIENT partners. Each timepiece is numbered and registered in our Geneva archives.
          </p>
          <div style={{ opacity: vis ? 1:0, transition:'opacity 0.8s ease 0.3s' }}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--ivory-muted)', marginBottom:'6px' }}>Starting Price</p>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'44px', fontWeight:300, color:'var(--ivory)', letterSpacing:'0.04em' }}>
              ${(watch?.price || 42500).toLocaleString()}
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'11px', color:'var(--ivory-muted)', marginTop:'4px', letterSpacing:'0.06em' }}>
              USD · Exclusive of applicable taxes & duties
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div style={{ opacity: vis ? 1:0, transform: vis ? 'none':'translateY(30px)', transition:'opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s' }}>
          {status === 'success' ? (
            <div style={{ padding:'48px', border:'1px solid var(--gold-border)', textAlign:'center' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin:'0 auto 20px' }}>
                <circle cx="20" cy="20" r="19" stroke="var(--gold)" strokeWidth="1" />
                <path d="M13 20L18 25L27 15" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'22px', fontWeight:300, color:'var(--ivory)', marginBottom:'12px' }}>Enquiry Received</p>
              <p style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--ivory-muted)', lineHeight:1.7, fontWeight:300 }}>
                An AURIENT specialist will contact you within 48 hours to arrange a private consultation at your preferred boutique.
              </p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'32px' }}>
              {[
                { id:'name',    label:'Full Name *',       type:'text',  ph:'Your name' },
                { id:'email',   label:'Email Address *',   type:'email', ph:'your@email.com' },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--ivory-muted)', marginBottom:'8px', textTransform:'uppercase' }}>{f.label}</label>
                  <input type={f.type} value={form[f.id]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    onFocus={() => setFocused(f.id)} onBlur={() => setFocused(null)}
                    placeholder={f.ph}
                    style={{ ...inputBase, borderBottomColor: focused === f.id ? 'var(--gold)' : 'var(--gold-border)' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--ivory-muted)', marginBottom:'8px', textTransform:'uppercase' }}>Message</label>
                <textarea rows={4} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                  placeholder="Preferred boutique, questions, or special requests..."
                  style={{ ...inputBase, resize:'none', borderBottomColor: focused === 'msg' ? 'var(--gold)' : 'var(--gold-border)' }}
                />
              </div>
              <button onClick={handleSubmit}
                disabled={status === 'sending' || !form.name || !form.email}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                style={{
                  alignSelf:'flex-start', fontFamily:'var(--font-mono)', fontSize:'10px',
                  letterSpacing:'0.22em', textTransform:'uppercase',
                  color: btnHov ? 'var(--bg-void)' : 'var(--ivory)',
                  background: btnHov ? 'var(--gold)' : 'transparent',
                  border:'1px solid var(--gold-border)',
                  padding:'14px 36px', cursor:'none',
                  opacity: form.name && form.email ? 1 : 0.45,
                  transition:'background 0.3s ease, color 0.3s ease',
                }}
              >{status === 'sending' ? 'Sending…' : 'Submit Enquiry'}</button>
              {status === 'error' && <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'#E87A7A', letterSpacing:'0.06em' }}>Something went wrong. Please try again.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
