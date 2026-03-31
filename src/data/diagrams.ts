// Animated SVG diagrams for concept visualization
// Using opacity-only animations for reliability across browsers

/** 变量绑定：贴标签的盒子 */
export const variableBindingSvg = `
<svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg" style="max-width:440px;width:100%">
  <style>
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    .s1{animation:fadeIn .5s ease .3s both}
    .s2{animation:fadeIn .5s ease 1s both}
    .s3{animation:fadeIn .5s ease 1.7s both}
    .s4{animation:fadeIn .5s ease 2.4s both}
  </style>
  <!-- 代码 -->
  <g class="s1">
    <text x="20" y="28" font-family="monospace" font-size="15" fill="#94a3b8">let score = 100;</text>
  </g>
  <!-- 标签 -->
  <g class="s2">
    <rect x="40" y="48" width="100" height="28" rx="4" fill="#6366f1"/>
    <text x="90" y="67" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="white">score</text>
    <text x="160" y="67" font-family="sans-serif" font-size="13" fill="#94a3b8">← 标签（变量名）</text>
  </g>
  <!-- 连线 -->
  <g class="s3">
    <line x1="90" y1="76" x2="90" y2="95" stroke="#6366f1" stroke-width="2"/>
    <polygon points="85,93 95,93 90,100" fill="#6366f1"/>
  </g>
  <!-- 盒子 -->
  <g class="s3">
    <rect x="40" y="100" width="100" height="55" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <text x="90" y="135" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="24" fill="#34d399">100</text>
    <text x="160" y="132" font-family="sans-serif" font-size="13" fill="#94a3b8">← 盒子（值）</text>
  </g>
  <!-- 总结 -->
  <g class="s4">
    <text x="290" y="67" font-family="sans-serif" font-size="13" fill="#fbbf24">score 就是 100</text>
    <text x="290" y="87" font-family="sans-serif" font-size="13" fill="#fbbf24">的名字！</text>
  </g>
</svg>`

/** 可变 vs 不可变 */
export const mutabilitySvg = `
<svg viewBox="0 0 540 250" xmlns="http://www.w3.org/2000/svg" style="max-width:540px;width:100%">
  <style>
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
    .a1{animation:fadeIn .5s ease .2s both}
    .a2{animation:fadeIn .5s ease .9s both}
    .a3{animation:fadeIn .4s ease 1.6s both; transform-origin:180px 90px}
    .a3x{animation:shake .4s ease 1.8s both}
    .a4{animation:fadeIn .5s ease 2.4s both}
    .a5{animation:fadeIn .5s ease 3.1s both}
  </style>
  <!-- 标题 -->
  <g class="a1">
    <text x="130" y="22" text-anchor="middle" font-family="monospace" font-size="13" fill="#ef4444">🔒 let x = 5;</text>
    <text x="410" y="22" text-anchor="middle" font-family="monospace" font-size="13" fill="#22c55e">🔓 let mut y = 5;</text>
  </g>
  <!-- 左侧：不可变 -->
  <g class="a2">
    <rect x="70" y="35" width="120" height="55" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <text x="130" y="68" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="22" fill="#34d399">5</text>
    <text x="130" y="108" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">🔒 不能改</text>
  </g>
  <!-- 左侧：试图修改 -->
  <g class="a3x">
    <g class="a3">
      <text x="130" y="140" text-anchor="middle" font-family="monospace" font-size="13" fill="#f87171">x = 10;  ← 修改？</text>
      <rect x="70" y="150" width="120" height="55" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
      <text x="130" y="183" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="22" fill="#f87171">10</text>
      <!-- 叉叉 -->
      <line x1="75" y1="155" x2="185" y2="200" stroke="#ef4444" stroke-width="3"/>
      <line x1="185" y1="155" x2="75" y2="200" stroke="#ef4444" stroke-width="3"/>
      <text x="130" y="228" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">❌ 编译器拒绝！</text>
    </g>
  </g>
  <!-- 右侧：可变 -->
  <g class="a4">
    <rect x="350" y="35" width="120" height="55" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="410" y="68" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="22" fill="#34d399">5</text>
    <text x="410" y="108" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">🔓 允许修改</text>
  </g>
  <!-- 右侧：成功修改 -->
  <g class="a5">
    <text x="410" y="140" text-anchor="middle" font-family="monospace" font-size="13" fill="#22c55e">y = 10;  ← 修改！</text>
    <line x1="410" y1="90" x2="410" y2="150" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,3"/>
    <polygon points="405,148 415,148 410,155" fill="#22c55e"/>
    <rect x="350" y="155" width="120" height="55" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="410" y="188" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="22" fill="#34d399">10</text>
    <text x="410" y="228" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#22c55e">✅ 成功！</text>
  </g>
</svg>`

/** 所有权转移（Move） */
export const ownershipMoveSvg = `
<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;width:100%">
  <style>
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes grayOut{to{opacity:.2}}
    @keyframes drawArrow{from{stroke-dashoffset:160}to{stroke-dashoffset:0}}
    .m1{animation:fadeIn .5s ease .3s both}
    .m2{animation:drawArrow .6s ease 1s both;stroke-dasharray:160}
    .m3{animation:fadeIn .5s ease 1.5s both}
    .m4{animation:grayOut .5s ease 1.5s forwards}
    .m5{animation:fadeIn .5s ease 2.2s both}
  </style>
  <!-- s1 -->
  <g class="m1">
    <text x="90" y="22" text-anchor="middle" font-family="monospace" font-size="14" fill="#c4b5fd">s1</text>
    <rect x="30" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <text x="90" y="62" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="18" fill="#34d399">"hello"</text>
  </g>
  <!-- 箭头 -->
  <line class="m2" x1="155" y1="55" x2="310" y2="55" stroke="#fbbf24" stroke-width="2.5" marker-end="url(#mv-arr)"/>
  <text x="235" y="45" text-anchor="middle" font-family="monospace" font-size="12" fill="#94a3b8" class="m3">let s2 = s1;</text>
  <defs><marker id="mv-arr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#fbbf24"/></marker></defs>
  <!-- s2 -->
  <g class="m3">
    <text x="370" y="22" text-anchor="middle" font-family="monospace" font-size="14" fill="#c4b5fd">s2</text>
    <rect x="310" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="370" y="62" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="18" fill="#34d399">"hello"</text>
  </g>
  <!-- s1 变灰 -->
  <g class="m4">
    <rect x="30" y="30" width="120" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <text x="90" y="62" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="18" fill="#34d399">"hello"</text>
  </g>
  <!-- 标注 -->
  <g class="m5">
    <text x="90" y="110" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ef4444">❌ s1 失效</text>
    <text x="90" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">不再是主人</text>
    <text x="370" y="110" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#22c55e">✅ s2 是新主人</text>
    <text x="370" y="130" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">拥有 "hello"</text>
    <rect x="140" y="155" width="220" height="30" rx="6" fill="#fbbf2420" stroke="#fbbf24" stroke-width="1"/>
    <text x="250" y="175" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#fbbf24">数据只能有一个主人！</text>
  </g>
</svg>`

/** 借用（引用） */
export const borrowingSvg = `
<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" style="max-width:460px;width:100%">
  <style>
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes drawLine{from{stroke-dashoffset:120}to{stroke-dashoffset:0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
    .b1{animation:fadeIn .5s ease .3s both}
    .b2{animation:fadeIn .5s ease 1s both}
    .bline1{animation:drawLine .5s ease 1.2s both;stroke-dasharray:120}
    .b3{animation:fadeIn .5s ease 1.8s both}
    .bline2{animation:drawLine .5s ease 2s both;stroke-dasharray:120}
    .b4{animation:fadeIn .4s ease 2.6s both}
    .bpulse{animation:pulse 2s ease 3s infinite}
  </style>
  <!-- 主数据 -->
  <g class="b1">
    <text x="210" y="20" text-anchor="middle" font-family="monospace" font-size="13" fill="#c4b5fd">data（主人）</text>
    <rect x="150" y="28" width="120" height="50" rx="8" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
    <text x="210" y="60" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="18" fill="#34d399">"hello"</text>
  </g>
  <!-- 脉冲效果 -->
  <rect class="bpulse" x="148" y="26" width="124" height="54" rx="9" fill="none" stroke="#6366f180" stroke-width="2"/>
  <!-- 借用1 -->
  <g class="b2">
    <text x="70" y="140" text-anchor="middle" font-family="monospace" font-size="12" fill="#22c55e">&amp;data</text>
    <rect x="10" y="148" width="120" height="40" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="70" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#22c55e">👀 只读借用</text>
  </g>
  <line class="bline1" x1="210" y1="78" x2="70" y2="148" stroke="#22c55e" stroke-width="1.5" marker-end="url(#b-arr)"/>
  <!-- 借用2 -->
  <g class="b3">
    <text x="380" y="140" text-anchor="middle" font-family="monospace" font-size="12" fill="#22c55e">&amp;data</text>
    <rect x="320" y="148" width="120" height="40" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="380" y="173" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#22c55e">👀 只读借用</text>
  </g>
  <line class="bline2" x1="210" y1="78" x2="380" y2="148" stroke="#22c55e" stroke-width="1.5" marker-end="url(#b-arr)"/>
  <defs><marker id="b-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#22c55e"/></marker></defs>
  <!-- 说明 -->
  <g class="b4">
    <rect x="80" y="200" width="300" height="26" rx="6" fill="#22c55e15" stroke="#22c55e50" stroke-width="1"/>
    <text x="230" y="218" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#22c55e">data 还是主人，只是借给别人看看 ✅</text>
  </g>
</svg>`

/** 栈 vs 堆 */
export const stackHeapSvg = `
<svg viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" style="max-width:480px;width:100%">
  <style>
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes drawLine{from{stroke-dashoffset:180}to{stroke-dashoffset:0}}
    .h1{animation:fadeIn .4s ease .2s both}
    .h2{animation:fadeIn .4s ease .5s both}
    .h3{animation:fadeIn .4s ease .8s both}
    .h4{animation:fadeIn .4s ease 1.1s both}
    .h5{animation:fadeIn .5s ease 1.5s both}
    .hptr{animation:drawLine .6s ease 1.8s both;stroke-dasharray:180}
    .h6{animation:fadeIn .4s ease 2.4s both}
  </style>
  <!-- 栈标题 -->
  <g class="h1">
    <text x="85" y="18" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#6366f1">📋 栈（Stack）</text>
    <text x="85" y="35" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">快速 · 自动 · 大小固定</text>
  </g>
  <!-- 栈帧 -->
  <g class="h2">
    <rect x="15" y="45" width="140" height="32" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
    <text x="85" y="66" text-anchor="middle" font-family="monospace" font-size="13" fill="#34d399">x: i32 = 42</text>
  </g>
  <g class="h3">
    <rect x="15" y="82" width="140" height="32" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="1.5"/>
    <text x="85" y="103" text-anchor="middle" font-family="monospace" font-size="13" fill="#34d399">y: bool = true</text>
  </g>
  <g class="h4">
    <rect x="15" y="119" width="140" height="32" rx="4" fill="#1e293b" stroke="#fbbf24" stroke-width="1.5"/>
    <text x="85" y="140" text-anchor="middle" font-family="monospace" font-size="13" fill="#fbbf24">s: ptr →</text>
  </g>
  <!-- 堆标题 -->
  <g class="h5">
    <text x="370" y="18" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#22c55e">📦 堆（Heap）</text>
    <text x="370" y="35" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">灵活 · 大小可变 · 要管理</text>
  </g>
  <!-- 堆数据 -->
  <g class="h5">
    <rect x="290" y="50" width="160" height="70" rx="8" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="370" y="73" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#22c55e">String 数据</text>
    <text x="370" y="100" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="20" fill="#34d399">"hello"</text>
  </g>
  <!-- 指针箭头 -->
  <line class="hptr" x1="155" y1="135" x2="288" y2="85" stroke="#fbbf24" stroke-width="2" marker-end="url(#hp-arr)"/>
  <defs><marker id="hp-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#fbbf24"/></marker></defs>
  <!-- 注释 -->
  <g class="h6">
    <text x="85" y="175" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">整数、布尔 → 栈上</text>
    <text x="85" y="192" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">大小已知，自动回收</text>
    <text x="370" y="145" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">String → 堆上</text>
    <text x="370" y="162" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#94a3b8">大小可变，靠所有权管理</text>
  </g>
</svg>`
