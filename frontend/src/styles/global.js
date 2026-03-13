import T from "./theme.js";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; color:${T.pearl}; background:${T.midnight}; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
  .serif { font-family:'Cormorant Garamond',Georgia,serif; }
  .mono  { font-family:'JetBrains Mono',monospace; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .reveal { opacity:0; transform:translateY(30px); transition:all 0.7s cubic-bezier(0.16,1,0.3,1); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  a { text-decoration:none; }
  ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:${T.midnight}; }
  ::-webkit-scrollbar-thumb { background:${T.steel}; border-radius:3px; }
`;

export default GLOBAL_CSS;
