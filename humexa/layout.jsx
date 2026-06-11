/* Layout helpers: Container + Section rhythm. */
(function () {
  function Container({ children, style, narrow }) {
    return (
      <div style={{
        maxWidth: narrow ? 920 : 1200, marginInline: 'auto',
        paddingInline: 'clamp(20px, 4vw, 32px)', ...style,
      }}>{children}</div>
    );
  }

  function Section({ children, id, style, pad }) {
    return (
      <section id={id} style={{
        paddingBlock: pad || 'clamp(64px, 9vw, 120px)', position: 'relative', ...style,
      }}>{children}</section>
    );
  }

  Object.assign(window, { Container, Section });
})();
