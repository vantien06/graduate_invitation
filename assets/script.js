(function () {
  const C = window.INVITE;

  // --- Điền nội dung ---
  document.querySelectorAll("[data-bind]").forEach(el => {
    const v = C[el.dataset.bind];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-src]").forEach(img => {
    const src = C[img.dataset.src];
    img.onerror = () => img.classList.add("missing");
    if (src) img.src = src; else img.classList.add("missing");
  });
  // Tên người nhận lấy từ link: ...?i=<mã base64url>
  const params = new URLSearchParams(location.search);
  const decodeName = code => {
    try {
      let b = code.replace(/-/g, "+").replace(/_/g, "/");
      while (b.length % 4) b += "=";
      return new TextDecoder().decode(Uint8Array.from(atob(b), c => c.charCodeAt(0)));
    } catch (e) { return ""; }
  };
  const guest = (params.get("i") ? decodeName(params.get("i")) : "").trim().slice(0, 40);
  document.getElementById("guest").textContent = guest || C.defaultGuest || "cả nhà iu";
  // Link chung (không có tên người nhận) thì ẩn số điện thoại và Zalo
  if (!guest) {
    document.querySelector(".phones-row").hidden = true;
    document.getElementById("zalo").closest(".c-row").hidden = true;
    const or = document.querySelector("#contact .or");
    if (or) or.textContent = "Liên hệ với mình qua";
  }

  const q = encodeURIComponent(C.mapQuery || C.venue);
  const mq = C.mapCoords ? encodeURIComponent(C.mapCoords) : q;
  document.getElementById("map").src = `https://maps.google.com/maps?q=${mq}&z=17&hl=vi&output=embed`;
  document.getElementById("directions").href = C.mapLink || `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const fmtPhone = n => n.replace(/\D/g, "").replace(/^(\d{4})(\d{3})(\d+)$/, "$1 $2 $3");
  const phoneBox = document.getElementById("phones");
  if (guest) (C.phones || (C.phone ? [C.phone] : [])).forEach(p => {
    const n = typeof p === "string" ? p : p.number;
    const line = document.createElement("span");
    line.className = "phone-line";
    const a = document.createElement("a");
    a.href = "tel:" + n.replace(/\D/g, "");
    a.textContent = fmtPhone(n);
    line.appendChild(a);
    if (p.name) {
      const who = document.createElement("span");
      who.className = "who";
      who.textContent = " (" + p.name + ")";
      line.appendChild(who);
    }
    phoneBox.appendChild(line);
  });
  document.getElementById("fb").href = C.facebookUrl || "#";
  document.getElementById("zalo").href = C.zaloUrl || ("https://zalo.me/" + (C.zaloPhone || ""));

  // --- Viền ren dọc 2 cạnh nắp phong bì ---
  (function buildLace() {
    const g = document.getElementById("lace"); if (!g) return;
    const NS = "http://www.w3.org/2000/svg";
    const add = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); g.appendChild(e); return e; };
    const tip = [80, 68], cen = [80, 22], W = 5, STEP = 7.2;
    [[0, 0], [160, 0]].forEach(p0 => {
      const dx = tip[0] - p0[0], dy = tip[1] - p0[1], L = Math.hypot(dx, dy);
      const d = [dx / L, dy / L];
      let n = [-d[1], d[0]];
      const mid = [p0[0] + dx / 2 - cen[0], p0[1] + dy / 2 - cen[1]];
      if (n[0] * mid[0] + n[1] * mid[1] < 0) n = [-n[0], -n[1]];
      const at = (t, o) => [p0[0] + d[0] * t + n[0] * o, p0[1] + d[1] * t + n[1] * o];
      const q = (a, b, c, e) => [at(a, b), at(a, 0), at(c, 0), at(c, e)].map(v => v.join(",")).join(" ");
      add("polygon", { points: q(0, W, L, W), fill: "#fcf1f3" });
      add("line", { x1: at(0, 1.4)[0], y1: at(0, 1.4)[1], x2: at(L, 1.4)[0], y2: at(L, 1.4)[1], stroke: "#e9b3c0", "stroke-width": .5, "stroke-dasharray": ".8 .9" });
      for (let t = STEP / 2; t < L - 2; t += STEP) {
        const c = at(t, W);
        add("circle", { cx: c[0], cy: c[1], r: 3.7, fill: "#fcf1f3" });
        add("circle", { cx: c[0], cy: c[1], r: 3.7, fill: "none", stroke: "#efc3cd", "stroke-width": .3 });
        add("circle", { cx: c[0], cy: c[1], r: .9, fill: "none", stroke: "#e9b0bd", "stroke-width": .4 });
        const base = Math.atan2(n[1], n[0]);
        for (let i = -3; i <= 3; i++) {   // nan quạt kiểu ren móc
          const ang = base + i * 0.36, ca = Math.cos(ang), sa = Math.sin(ang);
          add("line", { x1: c[0] + ca * 1.4, y1: c[1] + sa * 1.4, x2: c[0] + ca * 3.2, y2: c[1] + sa * 3.2, stroke: "#eab2bf", "stroke-width": .38 });
        }
        for (let a = -1; a <= 1; a++) {
          const h = at(t + a * 1.9, W + 1.5 + (a === 0 ? .5 : 0));
          add("circle", { cx: h[0], cy: h[1], r: .45, fill: "#e5a3b2" });
        }
        const pc = at(t, W + 4.2);
        add("circle", { cx: pc[0], cy: pc[1], r: .7, fill: "#fcf1f3" });
        const hb = at(t + STEP / 2, 3.2);
        add("circle", { cx: hb[0], cy: hb[1], r: .9, fill: "none", stroke: "#e9b0bd", "stroke-width": .4 });
      }
    });
  })();

  // --- Album ảnh ---
  (function buildAlbum() {
    const grid = document.getElementById("albumGrid"); if (!grid) return;
    const y = String(C.year || "2026");
    document.getElementById("yearA").textContent = y.slice(0, 2);
    document.getElementById("yearB").textContent = y.slice(2);
    const list = (C.album || []).filter(Boolean);
    // Mỗi nhóm 6 ảnh: [1 | 2/3 chồng] , [4 | 5] , [6]
    let r1, stack, r2;
    const slot = i => {
      const k = i % 6;
      if (k === 0) {
        r1 = document.createElement("div"); r1.className = "alb-r1"; grid.appendChild(r1);
        stack = document.createElement("div"); stack.className = "alb-stack";
        return r1;
      }
      if (k === 1) { r1.appendChild(stack); return stack; }
      if (k === 2) return stack;
      if (k === 3) { r2 = document.createElement("div"); r2.className = "alb-r2"; grid.appendChild(r2); return r2; }
      if (k === 4) return r2;
      return grid;
    };
    list.forEach((src, i) => {
      const f = document.createElement("figure");
      f.className = [1, 2, 5].includes(i % 6) ? "ph wide" : "ph";
      const img = new Image();
      img.alt = "Ảnh " + (i + 1); img.loading = "lazy";
      img.onerror = () => f.classList.add("empty");
      img.src = src;
      f.appendChild(img);
      f.dataset.i = i;
      slot(i).appendChild(f);
    });
    const io2 = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const col = e.target.offsetLeft > grid.clientWidth / 3 ? 1 : 0;
      e.target.style.transitionDelay = (col * 0.18) + "s";
      e.target.classList.add("in"); io2.unobserve(e.target);
    }), { threshold: 0.2 });
    grid.querySelectorAll(".ph").forEach(f => io2.observe(f));

    // Xem ảnh phóng to
    const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
    let cur = 0;
    const show = i => { cur = (i + list.length) % list.length; lbImg.src = list[cur]; };
    const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
    grid.addEventListener("click", e => {
      const f = e.target.closest(".ph"); if (!f || f.classList.contains("empty")) return;
      show(+f.dataset.i); lb.hidden = false; document.body.style.overflow = "hidden";
    });
    lb.querySelector(".lb-close").onclick = close;
    lb.querySelector(".lb-prev").onclick = e => { e.stopPropagation(); show(cur - 1); };
    lb.querySelector(".lb-next").onclick = e => { e.stopPropagation(); show(cur + 1); };
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    let x0 = null;
    lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
    });
  })();

  // --- Đếm ngược ---
  (function countdown() {
    const box = document.getElementById("cd"); if (!box || !C.eventStart) return;
    const target = new Date(C.eventStart).getTime();
    const el = {}; box.querySelectorAll(".cd-n").forEach(n => el[n.dataset.u] = n);
    const pad = v => String(v).padStart(2, "0");
    function tick() {
      let t = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const v = { d: Math.floor(t / 86400), h: Math.floor(t % 86400 / 3600), m: Math.floor(t % 3600 / 60), s: t % 60 };
      for (const k in v) { const txt = pad(v[k]); if (el[k].textContent !== txt) el[k].textContent = txt; }
      if (t === 0) { document.getElementById("cdDone").hidden = false; return; }
      setTimeout(tick, 1000 - (Date.now() % 1000));
    }
    tick();
  })();

  // --- Lá thư ---
  (function letter() {
    const box = document.getElementById("noteLetter"); if (!box) return;
    (C.letter || []).forEach(t => { const p = document.createElement("p"); p.textContent = t; box.appendChild(p); });
    const orn = document.createElement("div");
    orn.className = "note-orn";
    orn.innerHTML = '<svg viewBox="0 0 140 24" aria-hidden="true"><path d="M4 16 C24 10 40 20 56 15" /><path d="M84 15 C100 20 116 10 136 16" /><path d="M58 11 L70 6 L82 11 L70 16 Z" /><path d="M63 13 L63 18 C67 20 73 20 77 18 L77 13" /><path d="M82 11 L82 17" /></svg>';
    box.appendChild(orn);
  })();

  // --- Nền: sao lấp lánh + cánh hoa rơi ---
  const sky = document.getElementById("sky");
  const rnd = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.className = "star";
    s.textContent = Math.random() < 0.5 ? "✦" : "★";
    s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;font-size:${rnd(10, 26)}px;animation-delay:${rnd(0, 4)}s;animation-duration:${rnd(2.5, 5)}s`;
    sky.appendChild(s);
  }
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.cssText = `left:${rnd(0, 100)}%;animation-delay:${rnd(0, 14)}s;animation-duration:${rnd(10, 18)}s;transform:scale(${rnd(0.6, 1.2)})`;
    sky.appendChild(p);
  }

  // --- Mở phong bì ---
  const env = document.getElementById("envelope");
  const bgm = document.getElementById("bgm");
  const musicBtn = document.getElementById("musicBtn");
  if (C.music) { bgm.src = C.music; musicBtn.hidden = false; }

  // Chỉ cho mở sau khi phong bì đã xuất hiện xong
  let ready = false, wantOpen = false;
  setTimeout(() => { ready = true; if (wantOpen) openEnvelope(); }, 4100);

  function openEnvelope() {
    if (!ready) { wantOpen = true; return; }
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    document.getElementById("hint").classList.add("gone");
    setTimeout(() => document.body.classList.remove("locked"), 2800);
    if (C.music) bgm.play().then(() => musicBtn.classList.add("on")).catch(() => {});
  }
  env.addEventListener("click", openEnvelope);
  env.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); } });
  if (/[?&]open\b/.test(location.search)) openEnvelope();
  musicBtn.addEventListener("click", () => {
    if (bgm.paused) { bgm.play(); musicBtn.classList.add("on"); }
    else { bgm.pause(); musicBtn.classList.remove("on"); }
  });

  // --- Hiện dần khi cuộn ---
  document.querySelectorAll(".stagger").forEach(box =>
    [...box.children].forEach((c, i) => c.style.transitionDelay = (0.35 + i * 0.15) + "s"));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));

})();
