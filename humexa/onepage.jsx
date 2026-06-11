/* Saventia — single-page composition. All content as anchored sections. */
(function () {
  const { useState, useEffect, useRef } = React;
  const { Container, Section, Reveal, Button, Icon, GlassCard, SectionHeader, Chip, PhotoSlot,
          ServiceCard, FeatureCard, StepCard, ArticleCard, CtaBand } = window;

  const anchor = (id) => ({ id, style: { scrollMarginTop: 104 } });

  /* ---------- HERO ---------- */
  function HeroText({ t, scrollTo, align }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start' }}>
        <Reveal delay={0}><div className="eyebrow">{t.hero.eyebrow}</div></Reveal>
        <Reveal delay={80} as="h1" style={{
          fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em',
          fontSize: 'clamp(2.5rem, 5vw, 4.1rem)', lineHeight: 1.04, color: 'var(--text-primary)',
          margin: 0, maxWidth: align === 'center' ? '20ch' : '15ch', textWrap: 'balance',
        }}>{t.hero.title}</Reveal>
        <Reveal delay={160} as="p" style={{
          color: 'var(--text-secondary)', fontSize: 'clamp(1.02rem, 1.4vw, 1.18rem)', lineHeight: 1.62,
          margin: 0, maxWidth: '60ch',
        }}>{t.hero.sub}</Reveal>
        <Reveal delay={240} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 6, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <Button variant="primary" onClick={() => scrollTo('contact')}>{t.hero.primary} <Icon name="arrow-right" size={17} color="#04130D" /></Button>
          <Button variant="ghost" onClick={() => scrollTo('services')}>{t.hero.ghost}</Button>
        </Reveal>
      </div>
    );
  }

  function BrandImage({ src, alt, ratio = '4 / 5', minHeight = 380, style }) {
    return (
      <div style={{
        position: 'relative', aspectRatio: ratio, minHeight, borderRadius: 24, overflow: 'hidden',
        border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.08)',
        background: 'var(--bg-800)', ...style,
      }}>
        <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,11,24,0) 55%, rgba(6,11,24,0.5) 100%)', pointerEvents: 'none' }} />
      </div>
    );
  }
  window.BrandImage = BrandImage;

  function HeroVisual({ t, visual }) {
    return (
      <Reveal delay={200} style={{ position: 'relative' }}>
        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)' }}>
          {visual === 'image'
            ? <BrandImage src="humexa/assets/hero-human-ai.webp" alt={t.locale === 'en' ? 'A businesswoman and an AI presence connected by a glowing bridge of light' : 'Une dirigeante et une présence IA reliées par un pont de lumière'} ratio="4 / 5" minHeight={380} />
            : visual === 'photo'
            ? <PhotoSlot id="humexa-hero" alt={t.locale === 'en' ? 'Executive workshop: team in strategic discussion' : 'Atelier de direction : équipe en discussion stratégique'} radius={24} style={{ aspectRatio: '4 / 5', minHeight: 380 }} />
            : <window.HeroArt ratio="4 / 5" minHeight={380} />}
          <GlassCard strong pad={20} style={{ position: 'absolute', left: -22, bottom: 28, width: 252, display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--emerald-400)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald-400)', boxShadow: '0 0 10px var(--emerald-400)' }} />
              {t.locale === 'en' ? 'Our promise' : 'Notre promesse'}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.12rem', lineHeight: 1.28, letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>{t.locale === 'en' ? 'Amplify your teams — never replace them.' : 'Amplifier vos équipes, jamais les remplacer.'}</span>
          </GlassCard>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-12% -10% auto auto', width: 180, height: 180, background: 'radial-gradient(circle, rgba(52,224,168,0.4), transparent 70%)', filter: 'blur(20px)', zIndex: -1 }} />
        </div>
      </Reveal>
    );
  }

  /* ---------- CINEMATIC HERO (full-bleed, scroll-reactive) ---------- */
  function CinematicHero({ t, scrollTo, visual }) {
    const imgRef = useRef(null);
    const contentRef = useRef(null);
    const cueRef = useRef(null);
    const useArt = visual === 'artwork';

    useEffect(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const y = window.scrollY;
          const p = Math.min(1, y / window.innerHeight);
          if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${y * 0.26}px, 0) scale(${1.04 + p * 0.04})`;
          if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
            contentRef.current.style.opacity = String(Math.max(0, 1 - p * 1.15));
          }
          if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - p * 2.4));
        });
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
    }, []);

    return (
      <section id="accueil" style={{ position: 'relative', minHeight: '100svh', marginTop: -92, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', scrollMarginTop: 104 }}>
        <div ref={imgRef} aria-hidden="true" style={{ position: 'absolute', inset: '-8% 0 0 0', zIndex: 0, willChange: 'transform' }}>
          {useArt
            ? <window.HeroArt ratio="16 / 9" minHeight="108vh" style={{ borderRadius: 0, border: 'none', height: '108vh' }} />
            : <img src="humexa/assets/hero-human-ai.webp" alt={t.locale === 'en' ? 'A businesswoman and an AI presence connected by a glowing bridge of light' : 'Une dirigeante et une présence IA reliées par un pont de lumière'}
                style={{ width: '100%', height: '112%', objectFit: 'cover', objectPosition: 'center 28%', display: 'block' }} />}
        </div>
        {/* scrims for legibility */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(6,11,24,0.80) 0%, rgba(6,11,24,0.20) 24%, rgba(6,11,24,0.05) 50%, rgba(6,11,24,0.70) 84%, var(--bg-900) 100%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(96deg, rgba(6,11,24,0.78) 0%, rgba(6,11,24,0.34) 40%, rgba(6,11,24,0) 66%)' }} />
        <Container style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: 'clamp(132px, 20vh, 220px)', paddingBottom: 'clamp(72px, 11vh, 132px)' }}>
          <div ref={contentRef} style={{ willChange: 'transform, opacity', maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Reveal delay={0}><div className="eyebrow">{t.hero.eyebrow}</div></Reveal>
            <Reveal delay={80} as="h1" style={{
              fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.022em',
              fontSize: 'clamp(2.6rem, 5.6vw, 4.7rem)', lineHeight: 1.02, color: 'var(--text-primary)',
              margin: 0, maxWidth: '16ch', textWrap: 'balance', textShadow: '0 2px 30px rgba(6,11,24,0.5)',
            }}>{t.hero.title}</Reveal>
            <Reveal delay={160} as="p" style={{
              color: 'var(--text-primary)', opacity: 0.86, fontSize: 'clamp(1.04rem, 1.5vw, 1.24rem)', lineHeight: 1.6,
              margin: 0, maxWidth: '54ch', textShadow: '0 1px 16px rgba(6,11,24,0.55)',
            }}>{t.hero.sub}</Reveal>
            <Reveal delay={240} style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
              <Button variant="primary" onClick={() => scrollTo('contact')}>{t.hero.primary} <Icon name="arrow-right" size={17} color="#04130D" /></Button>
              <Button variant="ghost" onClick={() => scrollTo('services')}>{t.hero.ghost}</Button>
            </Reveal>
          </div>
        </Container>
        <button ref={cueRef} onClick={() => scrollTo('services')} aria-label={t.locale === 'en' ? 'Scroll to content' : 'Défiler vers le contenu'}
          style={{ position: 'absolute', zIndex: 2, left: '50%', bottom: 'clamp(20px, 3vh, 34px)', transform: 'translateX(-50%)',
            display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 999, cursor: 'pointer',
            background: 'var(--glass-strong)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <span className="hero-cue" style={{ display: 'inline-flex' }}><Icon name="chevron-down" size={20} color="var(--text-primary)" /></span>
        </button>
      </section>
    );
  }

  function Hero({ t, scrollTo, layout, visual }) {
    if (layout === 'cinematic') return <CinematicHero t={t} scrollTo={scrollTo} visual={visual} />;
    if (layout === 'centered') {
      return (
        <Section pad="clamp(96px, 13vw, 168px)" id="accueil" style={anchor('accueil').style}>
          <Container narrow>
            <HeroText t={t} scrollTo={scrollTo} align="center" />
            <Reveal delay={320} style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
              {visual === 'image'
                ? <window.BrandImage src="humexa/assets/hero-human-ai.webp" alt={t.locale === 'en' ? 'A businesswoman and an AI presence connected by a glowing bridge of light' : 'Une dirigeante et une présence IA reliées par un pont de lumière'} ratio="16 / 7" minHeight={260} />
                : visual === 'photo'
                ? <PhotoSlot id="humexa-hero-wide" alt={t.locale === 'en' ? 'Team in an organizational transformation workshop' : 'Équipe en atelier de transformation organisationnelle'} radius={24} style={{ aspectRatio: '16 / 7', minHeight: 240 }} />
                : <window.RibbonArt ratio="16 / 7" minHeight={240} />}
            </Reveal>
          </Container>
        </Section>
      );
    }
    if (layout === 'minimal') {
      return (
        <Section pad="clamp(120px, 17vw, 230px)" id="accueil" style={anchor('accueil').style}>
          <Container narrow><HeroText t={t} scrollTo={scrollTo} align="center" /></Container>
        </Section>
      );
    }
    return (
      <Section pad="clamp(84px, 11vw, 150px)" id="accueil" style={anchor('accueil').style}>
        <Container>
          <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
            <HeroText t={t} scrollTo={scrollTo} align="left" />
            <HeroVisual t={t} visual={visual} />
          </div>
        </Container>
      </Section>
    );
  }

  /* ---------- CONTACT FORM ---------- */
  function Field({ label, name, type = 'text', value, onChange, error, placeholder, textarea }) {
    const [focus, setFocus] = useState(false);
    const common = {
      width: '100%', padding: textarea ? '14px 16px' : '0 16px', minHeight: textarea ? 130 : 50,
      borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.04)',
      border: '1px solid ' + (error ? 'var(--error)' : 'var(--glass-border)'),
      color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.97rem',
      outline: 'none', resize: textarea ? 'vertical' : undefined,
      transition: 'border-color .2s ease, box-shadow .2s ease',
      ...(focus ? { borderColor: 'var(--emerald-500)', boxShadow: '0 0 0 3px rgba(52,224,168,0.18)' } : {}),
    };
    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
        {textarea
          ? <textarea name={name} value={value} placeholder={placeholder} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={common} />
          : <input name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={common} />}
        {error && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{error}</span>}
      </label>
    );
  }

  function ContactForm({ t }) {
    const c = t.contact;
    const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
    const submit = (e) => {
      e.preventDefault();
      const er = {};
      if (!form.name.trim()) er.name = c.errRequired;
      if (!form.email.trim()) er.email = c.errRequired;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = c.errEmail;
      if (!form.message.trim()) er.message = c.errRequired;
      setErrors(er);
      if (Object.keys(er).length === 0) setSent(true);
    };
    if (sent) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '36px 8px' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 60, height: 60, borderRadius: '50%', background: 'rgba(52,224,168,0.16)', border: '1px solid rgba(52,224,168,0.4)' }}>
            <Icon name="check" size={28} color="var(--emerald-400)" stroke={2.4} />
          </span>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>{c.success}</p>
        </div>
      );
    }
    return (
      <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field label={c.fields.name} name="name" value={form.name} onChange={set('name')} error={errors.name} placeholder={c.placeholders.name} />
          <Field label={c.fields.org} name="org" value={form.org} onChange={set('org')} placeholder={c.placeholders.org} />
        </div>
        <div className="field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field label={c.fields.email} name="email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder={c.placeholders.email} />
          <Field label={c.fields.phone} name="phone" value={form.phone} onChange={set('phone')} placeholder={c.placeholders.phone} />
        </div>
        <Field label={c.fields.message} name="message" textarea value={form.message} onChange={set('message')} error={errors.message} placeholder={c.placeholders.message} />
        <Button variant="primary" type="submit" full>{c.submit} <Icon name="arrow-right" size={17} color="#04130D" /></Button>
      </form>
    );
  }

  /* ---------- ONE PAGE ---------- */
  function OnePage({ t, scrollTo, heroLayout, visual }) {
    const indIcons = ['store', 'briefcase', 'landmark', 'graduation-cap', 'heart-handshake', 'factory', 'heart-pulse', 'leaf'];
    return (
      <React.Fragment>
        <Hero t={t} scrollTo={scrollTo} layout={heroLayout || 'split'} visual={visual} />

        {/* WHY (intro band) */}
        <Section pad="clamp(48px, 7vw, 96px)">
          <Container>
            <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(28px, 5vw, 64px)', alignItems: 'start' }}>
              <Reveal>
                <div className="eyebrow">{t.why.eyebrow}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1, color: 'var(--text-primary)', margin: '8px 0 0' }}>{t.why.title}</h2>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.7, margin: 0, maxWidth: '66ch' }}>{t.why.body}</p>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* SERVICES */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('services')}>
          <Container>
            <Reveal><SectionHeader eyebrow={t.servicesPreview.eyebrow} title={t.servicesPreview.title} intro={t.servicesPreview.intro} /></Reveal>
            <div className="cards-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 40 }}>
              {t.services.map((s, i) => <Reveal key={i} delay={i * 80} style={{ height: '100%' }}><ServiceCard service={s} full /></Reveal>)}
            </div>
          </Container>
        </Section>

        {/* APPROCHE = méthodologie */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('approche')}>
          <Container>
            <Reveal><SectionHeader eyebrow={t.methodology.eyebrow} title={t.methodology.title} intro={t.methodology.intro} /></Reveal>
            <div style={{ position: 'relative', marginTop: 40 }}>
              <div aria-hidden="true" className="method-line" style={{ position: 'absolute', top: 38, left: '12%', right: '12%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(52,224,168,0.5), transparent)' }} />
              <div className="cards-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
                {t.methodology.steps.map((s, i) => <Reveal key={i} delay={i * 80} style={{ height: '100%' }}><StepCard step={s.step} title={s.title} desc={s.desc} /></Reveal>)}
              </div>
            </div>
          </Container>
        </Section>

        {/* INDUSTRIES */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('industries')}>
          <Container>
            <Reveal><SectionHeader eyebrow={t.industries.eyebrow} title={t.industries.title} intro={t.industries.intro} align="center" /></Reveal>
            <div className="cards-ind" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 40 }}>
              {t.industries.list.map((s, i) => (
                <Reveal key={i} delay={i * 50} style={{ height: '100%' }}>
                  <GlassCard pad={24} style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
                    <span style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(52,224,168,0.16), rgba(45,107,255,0.10))', border: '1px solid var(--glass-border)' }}>
                      <Icon name={indIcons[i % indIcons.length]} size={20} color="var(--emerald-400)" stroke={1.6} />
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.04rem', lineHeight: 1.25, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{s}</span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* À PROPOS (intro + why-us + team + core) */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('apropos')}>
          <Container>
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
              <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className="eyebrow">{t.about.eyebrow}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1, color: 'var(--text-primary)', margin: '0 0 4px' }}>{t.about.title}</h2>
                {t.about.intro.map((p, i) => <p key={i} style={{ color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: i === 0 ? '1.15rem' : '1.0rem', lineHeight: 1.65, margin: 0, fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-body)', fontWeight: i === 0 ? 500 : 400, letterSpacing: i === 0 ? '-0.01em' : 0 }}>{p}</p>)}
              </Reveal>
              <Reveal delay={120}>
                {visual === 'image'
                  ? <window.BrandImage src="humexa/assets/hero-simplified.webp" alt={t.locale === 'en' ? 'A person and an AI presence meeting at a point of light' : 'Une personne et une présence IA se rejoignant en un point de lumière'} ratio="4 / 5" minHeight={340} />
                  : visual === 'photo'
                  ? <PhotoSlot id="humexa-about" alt={t.locale === 'en' ? 'Leadership meeting and strategic planning' : 'Réunion de leadership et planification stratégique'} radius={22} style={{ aspectRatio: '4 / 5', minHeight: 340 }} />
                  : <window.ConstellationArt ratio="4 / 5" minHeight={340} />}
              </Reveal>
            </div>

            {/* Why work with us */}
            <Reveal style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}><SectionHeader eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} /></Reveal>
            <div className="cards-why" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 36 }}>
              {t.whyUs.cards.map((c, i) => <Reveal key={i} delay={i * 70} style={{ height: '100%' }}><FeatureCard index={i} title={c.title} desc={c.desc} /></Reveal>)}
            </div>

            {/* Team + core */}
            <Reveal style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}><SectionHeader eyebrow={t.locale === 'en' ? 'The team' : "L'équipe"} title={t.about.teamTitle} intro={t.about.teamBody} /></Reveal>
            <Reveal delay={100} style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {t.about.areas.map((s, i) => <Chip key={i} icon>{s}</Chip>)}
            </Reveal>
            <Reveal style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}>
              <GlassCard strong pad={'clamp(28px, 4vw, 48px)'} style={{ position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(500px 220px at 0% 0%, rgba(45,107,255,0.16), transparent 65%)', pointerEvents: 'none' }} />
                <p style={{ position: 'relative', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(1.3rem, 2.4vw, 1.85rem)', lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--text-primary)', margin: 0, maxWidth: '52ch' }}>{t.about.core}</p>
              </GlassCard>
            </Reveal>
          </Container>
        </Section>

        {/* PERSPECTIVES */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('perspectives')}>
          <Container>
            <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <SectionHeader eyebrow={t.insights.eyebrow} title={t.insights.title} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, background: 'rgba(245,181,68,0.12)', border: '1px solid rgba(245,181,68,0.3)', color: 'var(--warning)', fontSize: '0.82rem', fontWeight: 600 }}>
                <Icon name="info" size={15} color="var(--warning)" /> {t.insights.note}
              </span>
            </Reveal>
            <div className="cards-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 40 }}>
              {t.insights.articles.map((art, i) => <Reveal key={i} delay={i * 80} style={{ height: '100%' }}><ArticleCard article={art} readMore={t.insights.readMore} /></Reveal>)}
            </div>
          </Container>
        </Section>

        {/* CONTACT */}
        <Section pad="clamp(48px, 7vw, 104px)" {...anchor('contact')}>
          <Container>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(28px, 5vw, 56px)', alignItems: 'start' }}>
              <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div>
                  <div className="eyebrow">{t.contact.eyebrow}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1, color: 'var(--text-primary)', margin: '8px 0 14px' }}>{t.contact.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '46ch' }}>{t.contact.support}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { icon: 'calendar-check', fr: 'Première rencontre sans engagement', en: 'A no-obligation first meeting' },
                    { icon: 'compass', fr: 'Une lecture claire de votre potentiel IA', en: 'A clear read on your AI potential' },
                    { icon: 'users', fr: 'Une équipe multidisciplinaire à vos côtés', en: 'A multidisciplinary team by your side' },
                  ].map((it, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <span style={{ display: 'grid', placeItems: 'center', width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, rgba(52,224,168,0.16), rgba(45,107,255,0.10))', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
                        <Icon name={it.icon} size={19} color="var(--emerald-400)" stroke={1.6} />
                      </span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.45 }}>{t.locale === 'en' ? it.en : it.fr}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={100}>
                <GlassCard strong pad={'clamp(24px, 3vw, 36px)'}><ContactForm t={t} /></GlassCard>
              </Reveal>
            </div>
          </Container>
        </Section>
      </React.Fragment>
    );
  }

  window.OnePage = OnePage;
})();
