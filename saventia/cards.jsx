/* Shared section components used across Home + inner pages. */
(function () {
  const { GlassCard, IconTile, Icon, Button, Chip, Reveal } = window;

  /* Service card — preview (compact) or full (with items list) */
  function ServiceCard({ service, full, go }) {
    return (
      <GlassCard pad={28} style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        <IconTile name={service.icon} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.22rem', lineHeight: 1.22, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{service.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
        {full && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'grid', gap: 10 }}>
            {service.items.map((it, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.45 }}>
                <span style={{ marginTop: 2, color: 'var(--emerald-400)', flexShrink: 0, display: 'inline-flex' }}>
                  <Icon name="check" size={16} color="var(--emerald-400)" stroke={2.2} />
                </span>
                {it}
              </li>
            ))}
          </ul>
        )}
        {!full && go && (
          <button onClick={() => go('services')} style={{ marginTop: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: 'var(--emerald-400)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            En savoir plus <Icon name="arrow-right" size={15} color="var(--emerald-400)" />
          </button>
        )}
      </GlassCard>
    );
  }

  /* Feature card — why-us */
  function FeatureCard({ index, title, desc }) {
    return (
      <GlassCard pad={26} style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
        <span style={{ fontFamily: 'var(--font-mono, var(--font-body))', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--emerald-400)', fontWeight: 600 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.12rem', lineHeight: 1.25, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.58, margin: 0 }}>{desc}</p>
      </GlassCard>
    );
  }

  /* Step card — methodology */
  function StepCard({ step, title, desc }) {
    return (
      <GlassCard pad={26} style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '2.6rem', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1.2px var(--emerald-400)', letterSpacing: '-0.02em' }}>{step}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.18rem', color: 'var(--text-primary)', margin: '6px 0 0', letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.58, margin: 0 }}>{desc}</p>
      </GlassCard>
    );
  }

  /* Article card — insights */
  function ArticleCard({ article, readMore }) {
    return (
      <GlassCard pad={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
        <div style={{ height: 150, background: 'linear-gradient(135deg, rgba(45,107,255,0.22), rgba(52,224,168,0.14))', borderBottom: '1px solid var(--glass-border)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: 14, left: 14, padding: '5px 12px', borderRadius: 999, background: 'var(--glass-strong)', border: '1px solid var(--glass-border)', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.04em', color: 'var(--emerald-400)' }}>{article.tag}</span>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>{article.date}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.18rem', lineHeight: 1.25, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.01em' }}>{article.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.55, margin: 0 }}>{article.excerpt}</p>
          <span style={{ marginTop: 'auto', paddingTop: 8, color: 'var(--emerald-400)', fontWeight: 600, fontSize: '0.9rem' }}>{readMore}</span>
        </div>
      </GlassCard>
    );
  }

  /* CTA band */
  function CtaBand({ t, go }) {
    return (
      <GlassCard strong pad={'clamp(32px, 5vw, 56px)'} style={{
        textAlign: 'center', overflow: 'hidden', position: 'relative',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 240px at 50% -10%, rgba(52,224,168,0.18), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: 0, maxWidth: '22ch' }}>{t.finalCta.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '52ch' }}>{t.finalCta.sub}</p>
          <div style={{ marginTop: 6 }}>
            <Button variant="primary" onClick={() => go('contact')}>{t.cta} <Icon name="arrow-right" size={17} color="#04130D" /></Button>
          </div>
        </div>
      </GlassCard>
    );
  }

  Object.assign(window, { ServiceCard, FeatureCard, StepCard, ArticleCard, CtaBand });
})();
