/* Reusable primitives for PraxisAI — Aurora Glass system. */
(function () {
  const { useState, useEffect, useRef } = React;

  /* ---- Icon (lucide) ---- */
  function Icon({ name, size = 22, color = 'currentColor', stroke = 1.6, style }) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current && window.lucide) {
        ref.current.innerHTML = '';
        const el = document.createElement('i');
        el.setAttribute('data-lucide', name);
        ref.current.appendChild(el);
        window.lucide.createIcons({
          attrs: { width: size, height: size, stroke: color, 'stroke-width': stroke },
          nodes: [el],
        });
      }
    }, [name, size, color, stroke]);
    return <span ref={ref} style={{ display: 'inline-flex', ...style }} aria-hidden="true" />;
  }

  /* ---- Button ---- */
  function Button({ variant = 'primary', children, onClick, href, type, full, style }) {
    const [hover, setHover] = useState(false);
    const base = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
      minHeight: 48, padding: '0 26px', borderRadius: 14, cursor: 'pointer',
      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
      letterSpacing: '0.005em', textDecoration: 'none', border: '1px solid transparent',
      transition: 'transform .2s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease',
      transform: hover ? 'translateY(-1px)' : 'none', width: full ? '100%' : undefined,
      ...style,
    };
    const variants = {
      primary: {
        background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))',
        color: '#FFFFFF',
        boxShadow: hover ? '0 12px 34px rgba(37,99,235,0.42), 0 0 0 1px rgba(37,99,235,0.4)'
                         : '0 8px 22px rgba(37,99,235,0.28)',
      },
      ghost: {
        background: hover ? 'var(--glass-panel-hover)' : 'var(--glass-panel)',
        color: 'var(--text-primary)',
        borderColor: hover ? 'var(--glass-border-strong)' : 'var(--glass-border)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      },
    };
    const El = href ? 'a' : 'button';
    return (
      <El href={href} type={El === 'button' ? (type || 'button') : undefined} onClick={onClick}
        style={{ ...base, ...variants[variant] }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {children}
      </El>
    );
  }

  /* ---- GlassCard ---- */
  function GlassCard({ children, hover = true, strong = false, style, onClick, pad = 28 }) {
    const [h, setH] = useState(false);
    return (
      <div onClick={onClick}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: strong ? 'var(--glass-strong)' : (hover && h ? 'var(--glass-panel-hover)' : 'var(--glass-panel)'),
          border: '1px solid ' + (hover && h ? 'var(--glass-border-strong)' : 'var(--glass-border)'),
          borderRadius: 'var(--radius-lg)', padding: pad,
          boxShadow: hover && h ? 'var(--shadow-lg)' : 'var(--shadow-md)',
          backdropFilter: 'blur(16px) saturate(120%)', WebkitBackdropFilter: 'blur(16px) saturate(120%)',
          transition: 'transform .3s ease, box-shadow .3s ease, border-color .3s ease, background .3s ease',
          transform: hover && h ? 'translateY(-4px)' : 'none',
          position: 'relative', ...style,
        }}>
        {children}
      </div>
    );
  }

  /* ---- IconTile (diamond glass tile) ---- */
  function IconTile({ name }) {
    return (
      <span style={{
        display: 'grid', placeItems: 'center', width: 52, height: 52, borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(37,99,235,0.16), rgba(45,107,255,0.10))',
        border: '1px solid var(--glass-border)', color: 'var(--emerald-400)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
      }}>
        <Icon name={name} size={24} color="var(--emerald-400)" stroke={1.6} />
      </span>
    );
  }

  /* ---- SectionHeader ---- */
  function SectionHeader({ eyebrow, title, intro, align = 'left', max = 60 }) {
    return (
      <div style={{ textAlign: align, marginInline: align === 'center' ? 'auto' : undefined, maxWidth: align === 'center' ? `${max}ch` : undefined }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em',
          fontSize: 'clamp(1.7rem, 2.6vw, 2.3rem)', lineHeight: 1.1, color: 'var(--text-primary)',
          margin: '0 0 14px',
        }}>{title}</h2>
        {intro && <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '64ch', marginInline: align === 'center' ? 'auto' : undefined }}>{intro}</p>}
      </div>
    );
  }

  /* ---- Chip ---- */
  function Chip({ children, icon }) {
    const [h, setH] = useState(false);
    return (
      <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px',
        borderRadius: 999, fontSize: '0.92rem', color: 'var(--text-secondary)',
        background: h ? 'var(--glass-panel-hover)' : 'var(--glass-panel)',
        border: '1px solid ' + (h ? 'var(--glass-border-strong)' : 'var(--glass-border)'),
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        transition: 'all .25s ease', cursor: 'default',
      }}>
        {icon && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-400)', boxShadow: '0 0 8px var(--emerald-400)' }} />}
        {children}
      </span>
    );
  }

  /* ---- LocaleToggle ---- */
  function LocaleToggle({ locale, onChange }) {
    return (
      <div role="group" aria-label="Language" style={{
        display: 'inline-flex', padding: 3, borderRadius: 999,
        background: 'var(--glass-panel)', border: '1px solid var(--glass-border)',
      }}>
        {['fr', 'en'].map(l => {
          const active = locale === l;
          return (
            <button key={l} onClick={() => onChange(l)} aria-pressed={active} style={{
              border: 'none', cursor: 'pointer', padding: '6px 14px', borderRadius: 999,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.78rem',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              background: active ? 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))' : 'transparent',
              color: active ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'all .2s ease',
            }}>{l}</button>
          );
        })}
      </div>
    );
  }

  /* ---- Reveal (no-op pass-through) ----
     Entrance animations are intentionally removed: the whole page is held
     behind a single loading screen (see #loader in index.html) and revealed
     at once when ready, so no per-element scroll/mount animation is wanted.
     Kept as a component so existing call sites (and their delay/y/as props)
     keep working — extra props are ignored. */
  function Reveal({ children, as = 'div', style }) {
    const El = as;
    return <El style={style}>{children}</El>;
  }

  /* ---- PhotoSlot (image-slot wrapper with on-brand empty state) ---- */
  function PhotoSlot({ id, alt, radius = 20, shape = 'rounded', style }) {
    const ref = useRef(null);
    useEffect(() => {
      // image-slot is a web component; set attrs after mount
      if (ref.current) {
        ref.current.setAttribute('placeholder', alt);
      }
    }, [alt]);
    return (
      <div style={{ position: 'relative', ...style }}>
        <image-slot ref={ref} id={id} shape={shape} radius={radius}
          style={{ width: '100%', height: '100%', display: 'block', borderRadius: radius }}></image-slot>
      </div>
    );
  }

  Object.assign(window, { Icon, Button, GlassCard, IconTile, SectionHeader, Chip, LocaleToggle, Reveal, PhotoSlot });
})();
