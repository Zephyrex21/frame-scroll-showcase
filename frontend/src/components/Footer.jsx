const LINKS = {
  Collection: ['Imperion Chronographe','Perpétuel Series','Heritage Line','Limited Editions'],
  Maison:     ['Our Story','Master Watchmakers','Geneva Atelier','Certifications'],
  Services:   ['Private Consultation','Servicing & Repair','Warranty','Authentication'],
};

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg-void)', borderTop:'1px solid var(--gold-border)', padding:'64px 48px 40px', transition:'var(--theme-transition)' }}>

      {/* Top grid */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:'48px', paddingBottom:'56px', borderBottom:'1px solid var(--gold-border)' }}>

        {/* Brand */}
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'26px', fontWeight:400, letterSpacing:'0.26em', color:'var(--gold)', lineHeight:1 }}>AURIENT</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.22em', color:'var(--ivory-muted)', marginTop:'4px' }}>GENÈVE · EST. 1963</p>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--ivory-muted)', lineHeight:1.7, fontWeight:300, maxWidth:'260px' }}>
            Every second matters. Every component is considered. Since 1963, AURIENT has upheld one belief: a watch should be worthy of the time it measures.
          </p>
          {/* Geneva Seal */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'4px' }}>
            <div style={{ width:'20px', height:'20px', border:'1px solid var(--gold-border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M1 7L3 4L5 6L7 3L9 7H1Z" stroke="var(--gold)" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'8px', letterSpacing:'0.22em', color:'var(--ivory-muted)' }}>POINÇON DE GENÈVE</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([col, links]) => (
          <div key={col}>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.3em', color:'var(--gold)', textTransform:'uppercase', marginBottom:'20px' }}>{col}</p>
            <nav style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {links.map(link => (
                <span key={link} style={{ fontFamily:'var(--font-body)', fontSize:'13px', color:'var(--ivory-muted)', fontWeight:300, letterSpacing:'0.04em', cursor:'none' }}>{link}</span>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', paddingTop:'32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <p style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.18em', color:'var(--ivory-muted)' }}>
          © {new Date().getFullYear()} AURIENT SA — Geneva, Switzerland. All rights reserved.
        </p>
        <ul style={{ display:'flex', gap:'28px', listStyle:'none' }}>
          {['Privacy Policy','Legal Notice','Cookie Settings'].map(item => (
            <li key={item}><span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.18em', color:'var(--ivory-muted)', cursor:'none' }}>{item}</span></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
