const AWARDS = [
  'COSC Certified Chronometer',
  'Poinçon de Genève · Geneva Seal',
  'Grand Prix d\'Horlogerie de Genève',
  'Comité Colbert · Membre',
  'Red Dot Design Award 2024',
  'iF Design Award 2023',
  'Hodinkee — Watch of the Year',
  'COSC Certified Chronometer',
  'Poinçon de Genève · Geneva Seal',
  'Grand Prix d\'Horlogerie de Genève',
  'Comité Colbert · Membre',
  'Red Dot Design Award 2024',
  'iF Design Award 2023',
  'Hodinkee — Watch of the Year',
];

export default function Awards() {
  return (
    <div style={{
      background: 'var(--bg-dark)',
      borderTop: '1px solid var(--gold-border)',
      borderBottom: '1px solid var(--gold-border)',
      padding: '18px 0',
      overflow: 'hidden',
      transition: 'var(--theme-transition)',
    }}>
      <div style={{
        display: 'flex',
        gap: '0',
        animation: 'marquee 28s linear infinite',
        width: 'max-content',
      }}>
        {AWARDS.map((award, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              letterSpacing: '0.28em',
              color: 'var(--ivory-muted)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '0 32px',
            }}>
              {award}
            </span>
            <span style={{
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: 'var(--gold)',
              opacity: 0.5,
              flexShrink: 0,
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
