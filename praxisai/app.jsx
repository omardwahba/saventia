/* App shell: sticky glass nav, smooth-scroll, scroll-spy, progress bar, footer, Tweaks. */
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const { Logo, LocaleToggle, Button, Icon } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroLayout": "cinematic",
    "logoLockup": "inline",
    "visual": "artwork"
  }/*EDITMODE-END*/;

  const NAV_OFFSET = 92;

  function smoothTo(id) {
    if (id === 'accueil' || id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ---------- Scroll progress bar ---------- */
  function ProgressBar() {
    const [p, setP] = useState(0);
    useEffect(() => {
      const onScroll = () => {
        const h = document.documentElement;
        const max = (h.scrollHeight - h.clientHeight) || 1;
        setP(Math.min(1, Math.max(0, window.scrollY / max)));
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
    }, []);
    return (
      <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'transparent', pointerEvents: 'none' }}>
        <div style={{ height: '100%', width: `${p * 100}%`, background: 'linear-gradient(90deg, var(--emerald-500), var(--emerald-400))', boxShadow: '0 0 10px rgba(37,99,235,0.6)', transition: 'width .1s linear' }} />
      </div>
    );
  }

  /* ---------- Navbar ---------- */
  function Navbar({ t, active, go, locale, setLocale, lockup }) {
    const [open, setOpen] = useState(false);
    const links = t.nav;
    return (
      <div style={{ position: 'sticky', top: 14, zIndex: 40, paddingInline: 'clamp(14px, 4vw, 32px)' }}>
        <div style={{ maxWidth: 1200, marginInline: 'auto' }}>
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18,
            padding: '11px 12px 11px 18px', borderRadius: 999,
            background: 'var(--glass-strong)', border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(18px) saturate(130%)', WebkitBackdropFilter: 'blur(18px) saturate(130%)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <Logo lockup={lockup} size={30} fontSize={20} onClick={() => { go('accueil'); setOpen(false); }} />

            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {links.map(n => {
                const isActive = active === n.id;
                return (
                  <button key={n.id} onClick={() => go(n.id)} style={{
                    background: isActive ? 'var(--glass-panel-hover)' : 'none', border: 'none', cursor: 'pointer',
                    padding: '8px 14px', borderRadius: 999, fontFamily: 'var(--font-body)',
                    fontWeight: 500, fontSize: '0.9rem', position: 'relative',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color .2s ease, background .2s ease',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                    {n.label}
                  </button>
                );
              })}
            </div>

            <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LocaleToggle locale={locale} onChange={setLocale} />
              <div className="nav-cta"><Button variant="primary" onClick={() => go('contact')} style={{ minHeight: 42, padding: '0 18px', fontSize: '0.88rem' }}>{t.cta}</Button></div>
            </div>

            <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open} style={{
              display: 'none', background: 'var(--glass-panel)', border: '1px solid var(--glass-border)',
              width: 42, height: 42, borderRadius: 12, cursor: 'pointer', placeItems: 'center', color: 'var(--text-primary)',
            }}>
              <Icon name={open ? 'x' : 'menu'} size={22} color="var(--text-primary)" />
            </button>
          </nav>

          {open && (
            <div className="nav-drawer" style={{
              marginTop: 10, padding: 16, borderRadius: 'var(--radius-lg)',
              background: 'var(--glass-strong)', border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: 'var(--shadow-lg)',
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              {links.map(n => (
                <button key={n.id} onClick={() => { go(n.id); setOpen(false); }} style={{
                  background: active === n.id ? 'var(--glass-panel-hover)' : 'none', border: 'none', textAlign: 'left',
                  padding: '13px 14px', borderRadius: 12, cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontWeight: 500, fontSize: '1rem', color: active === n.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}>{n.label}</button>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
                <LocaleToggle locale={locale} onChange={setLocale} />
                <Button variant="primary" onClick={() => { go('contact'); setOpen(false); }} style={{ minHeight: 44, flex: 1 }}>{t.cta}</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---------- Footer ---------- */
  function Footer({ t, locale, setLocale, go }) {
    const colStyle = { display: 'flex', flexDirection: 'column', gap: 11 };
    const headStyle = { fontSize: '0.74rem', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--emerald-400)', fontWeight: 700, marginBottom: 4 };
    const linkStyle = { background: 'none', border: 'none', textAlign: 'left', padding: 0, cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.93rem' };
    const socials = [
      { icon: 'linkedin', label: 'LinkedIn' }, { icon: 'mail', label: locale === 'en' ? 'Email' : 'Courriel' }, { icon: 'globe', label: locale === 'en' ? 'Website' : 'Site web' },
    ];
    return (
      <footer style={{ background: 'var(--navy-ink)', borderTop: '1px solid rgba(37,99,235,0.3)', marginTop: 'clamp(40px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1200, marginInline: 'auto', paddingInline: 'clamp(20px, 4vw, 32px)', paddingBlock: 'clamp(40px, 5vw, 64px)' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr 1fr 1.2fr', gap: 'clamp(28px, 5vw, 56px)' }}>
            <div style={{ maxWidth: '40ch' }}>
              <Logo lockup="inline" size={32} fontSize={21} onClick={() => go('accueil')} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: '16px 0 0' }}>{t.tagline}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, margin: '12px 0 18px' }}>{t.statement}</p>
              <LocaleToggle locale={locale} onChange={setLocale} />
            </div>
            <nav style={colStyle} aria-label={t.footer.services.title}>
              <span style={headStyle}>{t.footer.services.title}</span>
              {t.footer.services.items.map((it, i) => (
                <button key={i} onClick={() => go('services')} style={linkStyle}>{it}</button>
              ))}
            </nav>
            <nav style={colStyle} aria-label={t.footer.resources.title}>
              <span style={headStyle}>{t.footer.resources.title}</span>
              {t.footer.resources.items.map((it, i) => (
                <button key={i} onClick={() => go('perspectives')} style={linkStyle}>{it}</button>
              ))}
            </nav>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <span style={headStyle}>{t.footer.contactTitle}</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.55, margin: 0, maxWidth: '24ch' }}>{t.footer.contactLine}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map((s, i) => (
                  <a key={i} href="#" aria-label={s.label} onClick={(e) => e.preventDefault()} style={{
                    display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12,
                    background: 'var(--glass-panel)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)',
                  }}>
                    <Icon name={s.icon} size={18} color="var(--text-secondary)" stroke={1.7} />
                  </a>
                ))}
              </div>
              <Button variant="primary" onClick={() => go('contact')} style={{ minHeight: 44 }}>{t.cta}</Button>
            </div>
          </div>
          <div style={{ marginTop: 'clamp(28px, 4vw, 44px)', paddingTop: 22, borderTop: '1px solid var(--glass-border)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>© 2026 {t.brand}. {locale === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>{t.tagline}</span>
          </div>
        </div>
      </footer>
    );
  }

  /* ---------- Site ---------- */
  function Site() {
    const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [locale, setLocale] = useState('fr');
    const [active, setActive] = useState('accueil');
    const base = window.SITE_CONTENT[locale];
    const t = { ...base, locale };

    useEffect(() => { document.documentElement.lang = locale; }, [locale]);
    useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [locale, tw, active]);

    // Dismiss the full-page loading screen once the app has mounted and fonts
    // are ready, so the whole page appears at once (not progressively). The
    // inline fallback in index.html clears it regardless if this never fires.
    useEffect(() => {
      const done = () => window.__praxisReady && window.__praxisReady();
      const fonts = document.fonts && document.fonts.ready;
      if (fonts) {
        let settled = false;
        const fire = () => { if (settled) return; settled = true; requestAnimationFrame(done); };
        fonts.then(fire);
        setTimeout(fire, 1200); // cap the wait so a slow font fetch can't stall reveal
      } else {
        requestAnimationFrame(done);
      }
    }, []);

    const go = useCallback((id) => { smoothTo(id); }, []);

    // scroll-spy
    useEffect(() => {
      const ids = ['accueil', ...t.nav.map(n => n.id), 'contact'];
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const mark = window.scrollY + NAV_OFFSET + 40;
          let current = 'accueil';
          for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= mark) current = id;
          }
          // near bottom → last section
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
          setActive(prev => (prev === current ? prev : current));
        });
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
    }, [locale]);

    return (
      <React.Fragment>
        <ProgressBar />
        <Navbar t={t} active={active} go={go} locale={locale} setLocale={setLocale} lockup={tw.logoLockup} />
        <main>
          <window.OnePage t={t} scrollTo={go} heroLayout={tw.heroLayout} visual={tw.visual} />
        </main>
        <Footer t={t} locale={locale} setLocale={setLocale} go={go} />

        <TweaksPanel title="Tweaks">
          <TweakSection label={locale === 'en' ? 'Hero layout' : 'Disposition du hero'} />
          <TweakRadio label={locale === 'en' ? 'Layout' : 'Disposition'} value={tw.heroLayout}
            options={['cinematic', 'split', 'centered', 'minimal']} onChange={(v) => setTweak('heroLayout', v)} />
          <TweakSection label={locale === 'en' ? 'Imagery' : 'Visuels'} />
          <TweakRadio label={locale === 'en' ? 'Slots' : 'Emplacements'} value={tw.visual}
            options={['artwork', 'photo']} onChange={(v) => setTweak('visual', v)} />
          <TweakSection label={locale === 'en' ? 'Logo lockup' : 'Logo'} />
          <TweakRadio label="Lockup" value={tw.logoLockup}
            options={['inline', 'tile', 'wordmark']} onChange={(v) => setTweak('logoLockup', v)} />
        </TweaksPanel>
      </React.Fragment>
    );
  }

  window.Site = Site;
})();
