/* PraxisAI logo — an abstract letter "P" drawn as one clean continuous line,
   punctuated by connected nodes, with a single node breaking forward to the
   right to suggest momentum. Strategic, credible, modern — no robots, brains,
   circuit boards, chat bubbles, or sci-fi clichés. Pure vector: sharp at any
   size and legible in black & white (mono) for favicons / LinkedIn / covers. */
(function () {
  const STROKE = 'var(--logo-stroke, var(--text-primary))';

  // Continuous-line P (viewBox 0 0 48 48). Stem rises on the left; the bowl
  // loops out to the right and rejoins the stem. Nodes sit at the joints.
  const P_PATH = 'M16 41 L16 9 Q 32 9 32 18 Q 32 27 17.5 27';
  // node positions: top of stem, bowl apex (right), bowl rejoin, foot of stem
  const NODES = [
    { x: 16, y: 9 }, { x: 32, y: 18 }, { x: 17.5, y: 27 }, { x: 16, y: 41 },
  ];

  function LogoMark({ size = 40, mono = false, glow = true }) {
    const id = React.useMemo(() => 'px' + Math.random().toString(36).slice(2, 7), []);
    const node = mono ? STROKE : 'var(--emerald-500)';
    const lead = mono ? STROKE : 'var(--emerald-400)';
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
        role="img" aria-label="PraxisAI" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          {glow && !mono && (
            <filter id={id + '-g'} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="0.9" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          )}
        </defs>

        {/* forward link — the P reaches ahead: a short connector + leading node */}
        <line x1="32" y1="18" x2="41.5" y2="18" stroke={mono ? STROKE : 'var(--emerald-400)'}
          strokeWidth="2.4" strokeLinecap="round" opacity={mono ? 0.55 : 0.9} />

        {/* the continuous P line */}
        <path d={P_PATH} stroke={STROKE} strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" />

        {/* connected nodes at the joints */}
        <g filter={glow && !mono ? `url(#${id}-g)` : undefined}>
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="2.5" fill={node}
              stroke={STROKE} strokeWidth={mono ? 0 : 1.1} />
          ))}
          {/* leading node — the forward momentum, brightest */}
          <circle cx="42" cy="18" r="2.9" fill={lead} filter={glow && !mono ? `url(#${id}-g)` : undefined} />
        </g>
      </svg>
    );
  }

  function Wordmark({ fontSize = 22, color = 'var(--text-primary)' }) {
    return (
      <span style={{
        fontFamily: 'var(--font-body)', fontWeight: 800, fontSize,
        letterSpacing: '-0.02em', color, lineHeight: 1, whiteSpace: 'nowrap',
      }}>
        Praxis<span style={{ color: 'var(--emerald-500)' }}>AI</span>
      </span>
    );
  }

  /* lockup: 'inline' | 'tile' | 'wordmark' */
  function Logo({ lockup = 'inline', size = 36, fontSize = 22, color, onClick, asButton = true }) {
    const common = {
      display: 'inline-flex', alignItems: 'center', gap: 11,
      textDecoration: 'none', cursor: onClick ? 'pointer' : 'default', background: 'none',
      border: 'none', padding: 0,
    };

    if (lockup === 'wordmark') {
      const El = asButton ? 'button' : 'span';
      return (
        <El style={{ ...common, gap: 9 }} onClick={onClick} aria-label="PraxisAI — accueil">
          <Wordmark fontSize={fontSize} color={color} />
        </El>
      );
    }

    let mark;
    if (lockup === 'tile') {
      mark = (
        <span style={{
          display: 'grid', placeItems: 'center', width: size + 16, height: size + 16,
          borderRadius: 14, background: 'linear-gradient(150deg, var(--bg-700), var(--navy-ink))',
          border: '1px solid var(--glass-border)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>
          <LogoMark size={size - 4} />
        </span>
      );
    } else {
      mark = <LogoMark size={size} />;
    }

    const El = asButton ? 'button' : 'span';
    return (
      <El style={common} onClick={onClick} aria-label="PraxisAI — accueil">
        {mark}
        <Wordmark fontSize={fontSize} color={color} />
      </El>
    );
  }

  Object.assign(window, { Logo, LogoMark, Wordmark });
})();
