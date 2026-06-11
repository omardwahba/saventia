/* Humexa logo — "Human at the centre of intelligence" mark.
   A human figure sits beneath a neural-network crown: blue nodes linked into a field of
   thought, with emerald synapses firing from the head into the network. Resolution-independent
   vector — sharp at any size. Mirrors the brand's Human ↔ IA positioning. */
(function () {
  let _uid = 0;

  // neural crown geometry (viewBox 0 0 48 48). e:1 => emerald accent node.
  const NODES = [
    { x: 24, y: 5,  r: 2.3, e: 1 }, { x: 33, y: 7,  r: 1.6 }, { x: 40, y: 13, r: 2 },
    { x: 43, y: 22, r: 1.5 }, { x: 15, y: 7, r: 1.6 }, { x: 8, y: 13, r: 2 },
    { x: 5,  y: 22, r: 1.5 }, { x: 24, y: 11, r: 1.5, e: 1 },
  ];
  const EDGES = [[0,1],[1,2],[2,3],[0,4],[4,5],[5,6],[0,7],[1,7],[4,7],[7,3],[7,6]];

  function LogoMark({ size = 40, glow = true }) {
    const id = React.useMemo(() => 'hx' + (++_uid), []);
    const fig = `url(#${id}-fig)`;
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none"
        role="img" aria-label="Humexa" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={id + '-fig'} x1="16" y1="15" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--emerald-400)" />
            <stop offset="1" stopColor="var(--blue-glow)" />
          </linearGradient>
          {glow && (
            <filter id={id + '-g'} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="0.7" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          )}
        </defs>

        {/* neural-network crown — edges */}
        <g stroke="var(--blue-soft)" strokeWidth="1" opacity="0.45" strokeLinecap="round">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
          ))}
        </g>
        {/* emerald synapse firing from head into the hidden node (hidden behind the figure over the face) */}
        <g stroke="var(--emerald-400)" strokeWidth="1.1" opacity="0.72" strokeLinecap="round">
          <line x1="24" y1="22" x2={NODES[7].x} y2={NODES[7].y} />
        </g>
        {/* nodes */}
        <g filter={glow ? `url(#${id}-g)` : undefined}>
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.e ? 'var(--emerald-400)' : 'var(--blue-soft)'} />
          ))}
        </g>

        {/* human figure (bust) at the centre */}
        <circle cx="24" cy="18.5" r="3.7" fill={fig} />
        <path d="M24 23.5 C 19 23.5, 16 27.4, 16 32.5 L 32 32.5 C 32 27.4, 29 23.5, 24 23.5 Z" fill={fig} />
      </svg>
    );
  }

  function Wordmark({ fontSize = 22, color = 'var(--text-primary)' }) {
    return (
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize,
        letterSpacing: '-0.02em', color, lineHeight: 1, whiteSpace: 'nowrap',
      }}>Humexa</span>
    );
  }

  /* lockup: 'inline' | 'tile' | 'image' | 'wordmark' */
  function Logo({ lockup = 'inline', size = 36, fontSize = 22, color, onClick, asButton = true }) {
    const common = {
      display: 'inline-flex', alignItems: 'center', gap: 12,
      textDecoration: 'none', cursor: onClick ? 'pointer' : 'default', background: 'none',
      border: 'none', padding: 0,
    };

    if (lockup === 'wordmark') {
      const El = asButton ? 'button' : 'span';
      return (
        <El style={{ ...common, gap: 9 }} onClick={onClick} aria-label="Humexa — accueil">
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--emerald-400)', boxShadow: '0 0 12px var(--emerald-400)', flexShrink: 0 }} />
          <Wordmark fontSize={fontSize} color={color} />
        </El>
      );
    }

    let mark;
    if (lockup === 'image') {
      mark = (
        <span style={{
          display: 'grid', placeItems: 'center', width: size + 14, height: size + 14,
          borderRadius: 13, background: 'radial-gradient(circle at 50% 42%, #ffffff, #eef2f8)',
          border: '1px solid var(--glass-border)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
          overflow: 'hidden',
        }}>
          <img src="humexa/assets/logo-mark.webp" alt="Humexa" width={size + 8} height={size + 8}
            style={{ display: 'block', objectFit: 'contain' }} />
        </span>
      );
    } else if (lockup === 'tile') {
      mark = (
        <span style={{
          display: 'grid', placeItems: 'center', width: size + 16, height: size + 16,
          borderRadius: 13, background: 'var(--glass-panel)', border: '1px solid var(--glass-border)',
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
      <El style={common} onClick={onClick} aria-label="Humexa — accueil">
        {mark}
        <Wordmark fontSize={fontSize} color={color} />
      </El>
    );
  }

  Object.assign(window, { Logo, LogoMark, Wordmark });
})();
