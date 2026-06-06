/* On-brand SVG artifacts for image slots — Aurora Glass visual language.
   No photos required; these are intentional brand graphics built from the
   Saventia mark (leaf-flame + orbit) and a multidisciplinary constellation. */
(function () {
  let _u = 0;
  const uid = (p) => p + (++_u);

  function Frame({ children, ratio = '4 / 5', minHeight = 380, style }) {
    return (
      <div style={{
        position: 'relative', aspectRatio: ratio, minHeight,
        borderRadius: 24, overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(11,27,58,0.9), rgba(6,11,24,0.92))',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.08)',
        ...style,
      }}>
        {children}
      </div>
    );
  }

  /* ---------- HERO: orbital knowledge field ---------- */
  function HeroArt({ ratio, minHeight, style }) {
    const g = uid('h');
    // unit leaf-flame from the logo, centered at (24,24) in a 48 box
    const LEAF = 'M24 5C14.5 15.5 14.5 30 24 43C33.5 30 33.5 15.5 24 5Z';
    const cx = 210, cy = 252;
    const orbits = [
      { rx: 168, ry: 66, tilt: -22, dur: 48, dir: 1, node: 'var(--emerald-400)', nr: 6 },
      { rx: 126, ry: 100, tilt: 28, dur: 36, dir: -1, node: 'var(--blue-soft)', nr: 4.5 },
      { rx: 92, ry: 150, tilt: 8, dur: 60, dir: 1, node: 'var(--emerald-400)', nr: 5 },
    ];
    return (
      <Frame ratio={ratio} minHeight={minHeight} style={style}>
        <svg viewBox="0 0 420 520" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ display: 'block' }}>
          <defs>
            <radialGradient id={g + '-wash'} cx="0.5" cy="0.42" r="0.75">
              <stop offset="0" stopColor="rgba(52,224,168,0.20)" />
              <stop offset="0.45" stopColor="rgba(45,107,255,0.12)" />
              <stop offset="1" stopColor="rgba(6,11,24,0)" />
            </radialGradient>
            <linearGradient id={g + '-leaf'} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--emerald-400)" />
              <stop offset="1" stopColor="var(--emerald-600)" />
            </linearGradient>
            <radialGradient id={g + '-leafill'} cx="0.5" cy="0.32" r="0.7">
              <stop offset="0" stopColor="rgba(52,224,168,0.34)" />
              <stop offset="1" stopColor="rgba(52,224,168,0)" />
            </radialGradient>
            <filter id={g + '-glow'} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <pattern id={g + '-grid'} width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M34 0H0V34" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="420" height="520" fill={`url(#${g}-grid)`} />
          <rect width="420" height="520" fill={`url(#${g}-wash)`} />

          {/* orbits */}
          {orbits.map((o, i) => (
            <g key={i} transform={`rotate(${o.tilt} ${cx} ${cy})`}>
              <g className="orbit-spin" style={{ ['--dur']: `${o.dur}s`, ['--dir']: o.dir, transformOrigin: `${cx}px ${cy}px` }}>
                <ellipse cx={cx} cy={cy} rx={o.rx} ry={o.ry} fill="none" stroke="var(--blue-soft)" strokeWidth="1" opacity="0.4" />
                <circle cx={cx + o.rx} cy={cy} r={o.nr} fill={o.node} filter={`url(#${g}-glow)`} />
                <circle cx={cx - o.rx} cy={cy} r={o.nr * 0.55} fill={o.node} opacity="0.7" />
              </g>
            </g>
          ))}

          {/* central mark */}
          <g transform={`translate(${cx} ${cy}) scale(3.4) translate(-24 -24)`}>
            <path d={LEAF} fill={`url(#${g}-leafill)`} stroke={`url(#${g}-leaf)`} strokeWidth="2.1" strokeLinejoin="round" />
            <path d="M24 9.5V38.5" stroke="var(--blue-soft)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
          </g>
          <circle cx={cx} cy={cy} r="3.4" fill="#fff" opacity="0.9" filter={`url(#${g}-glow)`} />
        </svg>
      </Frame>
    );
  }

  /* ---------- ABOUT: multidisciplinary constellation ---------- */
  function ConstellationArt({ ratio, minHeight, style }) {
    const g = uid('c');
    const nodes = [
      { x: 80, y: 90, r: 7, on: true }, { x: 200, y: 60, r: 5 }, { x: 320, y: 110, r: 8, on: true },
      { x: 130, y: 200, r: 5 }, { x: 250, y: 190, r: 9, on: true }, { x: 350, y: 250, r: 5 },
      { x: 70, y: 300, r: 8, on: true }, { x: 190, y: 330, r: 6 }, { x: 300, y: 360, r: 7, on: true },
      { x: 120, y: 430, r: 5 }, { x: 250, y: 450, r: 8, on: true }, { x: 350, y: 410, r: 5 },
    ];
    const edges = [[0,1],[1,2],[0,3],[3,4],[1,4],[4,5],[2,5],[3,6],[4,7],[6,7],[7,8],[5,8],[6,9],[7,10],[9,10],[8,11],[10,11],[8,2]];
    return (
      <Frame ratio={ratio} minHeight={minHeight} style={style}>
        <svg viewBox="0 0 420 520" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ display: 'block' }}>
          <defs>
            <radialGradient id={g + '-wash'} cx="0.35" cy="0.3" r="0.85">
              <stop offset="0" stopColor="rgba(45,107,255,0.16)" />
              <stop offset="0.5" stopColor="rgba(52,224,168,0.08)" />
              <stop offset="1" stopColor="rgba(6,11,24,0)" />
            </radialGradient>
            <filter id={g + '-glow'} x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="420" height="520" fill={`url(#${g}-wash)`} />
          {/* edges */}
          <g stroke="var(--blue-soft)" strokeWidth="1" opacity="0.34">
            {edges.map(([a, b], i) => (
              <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
            ))}
          </g>
          {/* nodes */}
          {nodes.map((n, i) => n.on ? (
            <g key={i} className="node-pulse" style={{ ['--d']: `${(i % 5) * 0.6}s`, transformOrigin: `${n.x}px ${n.y}px` }}>
              <circle cx={n.x} cy={n.y} r={n.r + 5} fill="rgba(52,224,168,0.12)" />
              <circle cx={n.x} cy={n.y} r={n.r} fill="var(--emerald-400)" filter={`url(#${g}-glow)`} />
            </g>
          ) : (
            <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="rgba(255,255,255,0.10)" stroke="var(--glass-border-strong)" strokeWidth="1" />
          ))}
        </svg>
      </Frame>
    );
  }

  /* ---------- WIDE: aurora ribbon (for centered hero variant) ---------- */
  function RibbonArt({ ratio = '16 / 7', minHeight = 240, style }) {
    const g = uid('r');
    return (
      <Frame ratio={ratio} minHeight={minHeight} style={style}>
        <svg viewBox="0 0 960 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ display: 'block' }}>
          <defs>
            <linearGradient id={g + '-r1'} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(45,107,255,0)" />
              <stop offset="0.5" stopColor="rgba(45,107,255,0.5)" />
              <stop offset="1" stopColor="rgba(52,224,168,0)" />
            </linearGradient>
            <linearGradient id={g + '-r2'} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(52,224,168,0)" />
              <stop offset="0.5" stopColor="rgba(52,224,168,0.55)" />
              <stop offset="1" stopColor="rgba(45,107,255,0)" />
            </linearGradient>
            <filter id={g + '-b'}><feGaussianBlur stdDeviation="14" /></filter>
            <pattern id={g + '-grid'} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="960" height="400" fill={`url(#${g}-grid)`} />
          <path d="M-40 250 C 200 120, 380 300, 600 180 S 920 120, 1000 200" fill="none" stroke={`url(#${g}-r1)`} strokeWidth="28" filter={`url(#${g}-b)`} className="ribbon-drift" />
          <path d="M-40 190 C 220 300, 420 130, 640 240 S 900 300, 1000 160" fill="none" stroke={`url(#${g}-r2)`} strokeWidth="22" filter={`url(#${g}-b)`} className="ribbon-drift2" />
          {[160, 360, 540, 720, 840].map((x, i) => (
            <circle key={i} cx={x} cy={180 + (i % 3) * 36} r={i % 2 ? 4 : 6} fill={i % 2 ? 'var(--blue-soft)' : 'var(--emerald-400)'} opacity="0.85" />
          ))}
        </svg>
      </Frame>
    );
  }

  Object.assign(window, { HeroArt, ConstellationArt, RibbonArt });
})();
