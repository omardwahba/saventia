/* Saventia logo — abstract "flame / leaf of knowledge" mark with a glowing orbit node.
   Concept: an upward leaf-flame (growth + insight) crossed by a quiet orbit; a single
   emerald node marks the point of knowledge. Emerald owns the accent; blue stays subtle. */
(function () {
  let _uid = 0;

  function LogoMark({ size = 40, glow = true }) {
    const id = React.useMemo(() => 'lm' + (++_uid), []);
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
        role="img" aria-label="Saventia" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={id + '-leaf'} x1="24" y1="5" x2="24" y2="43" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--emerald-400)" />
            <stop offset="1" stopColor="var(--emerald-600)" />
          </linearGradient>
          <radialGradient id={id + '-fill'} cx="0.5" cy="0.32" r="0.75">
            <stop offset="0" stopColor="rgba(52,224,168,0.30)" />
            <stop offset="0.6" stopColor="rgba(52,224,168,0.06)" />
            <stop offset="1" stopColor="rgba(52,224,168,0)" />
          </radialGradient>
          {glow && (
            <filter id={id + '-g'} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          )}
        </defs>

        {/* orbit */}
        <ellipse cx="24" cy="24" rx="21" ry="8.4" transform="rotate(-24 24 24)"
          stroke="var(--blue-soft)" strokeWidth="1.1" opacity="0.5" />

        {/* leaf-flame body */}
        <path d="M24 5C14.5 15.5 14.5 30 24 43C33.5 30 33.5 15.5 24 5Z"
          fill={`url(#${id}-fill)`} stroke={`url(#${id}-leaf)`} strokeWidth="2.4"
          strokeLinejoin="round" />
        {/* spine */}
        <path d="M24 9.5V38.5" stroke="var(--blue-soft)" strokeWidth="1.1"
          opacity="0.6" strokeLinecap="round" />

        {/* knowledge node on the orbit */}
        <g filter={glow ? `url(#${id}-g)` : undefined}>
          <circle cx="39.4" cy="13.4" r="3.4" fill="var(--emerald-400)" />
        </g>
      </svg>
    );
  }

  function Wordmark({ fontSize = 22, color = 'var(--text-primary)' }) {
    return (
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize,
        letterSpacing: '-0.02em', color, lineHeight: 1, whiteSpace: 'nowrap',
      }}>Saventia</span>
    );
  }

  /* lockup: 'inline' | 'tile' | 'stacked' | 'wordmark' */
  function Logo({ lockup = 'inline', size = 36, fontSize = 22, color, onClick, asButton = true }) {
    const common = {
      display: 'inline-flex', alignItems: 'center', gap: lockup === 'stacked' ? 0 : 12,
      flexDirection: lockup === 'stacked' ? 'column' : 'row',
      textDecoration: 'none', cursor: onClick ? 'pointer' : 'default', background: 'none',
      border: 'none', padding: 0,
    };

    if (lockup === 'wordmark') {
      const El = asButton ? 'button' : 'span';
      return (
        <El style={{ ...common, gap: 9 }} onClick={onClick} aria-label="Saventia — accueil">
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--emerald-400)', boxShadow: '0 0 12px var(--emerald-400)', flexShrink: 0 }} />
          <Wordmark fontSize={fontSize} color={color} />
        </El>
      );
    }

    const mark = lockup === 'tile' ? (
      <span style={{
        display: 'grid', placeItems: 'center', width: size + 16, height: size + 16,
        borderRadius: 13, background: 'var(--glass-panel)', border: '1px solid var(--glass-border)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        <LogoMark size={size - 4} />
      </span>
    ) : <LogoMark size={size} />;

    const inner = (
      <React.Fragment>
        {mark}
        <Wordmark fontSize={lockup === 'stacked' ? fontSize : fontSize} color={color} />
      </React.Fragment>
    );

    const El = asButton ? 'button' : 'span';
    return (
      <El style={lockup === 'stacked' ? { ...common, gap: 10 } : common}
        onClick={onClick} aria-label="Saventia — accueil">
        {inner}
      </El>
    );
  }

  Object.assign(window, { Logo, LogoMark, Wordmark });
})();
