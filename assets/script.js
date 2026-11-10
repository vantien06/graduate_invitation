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
  const q = encodeURIComponent(C.mapQuery || C.venue);
  document.getElementById("map").src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
  document.getElementById("directions").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  document.getElementById("phone").href = "tel:" + (C.phone || "").replace(/\s/g, "");
  document.getElementById("fb").href = C.facebookUrl || "#";
  document.getElementById("zalo").href = "https://zalo.me/" + (C.zaloPhone || "");

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

  function openEnvelope() {
    if (env.classList.contains("open")) return;
    env.classList.add("open");
    document.getElementById("hint").classList.add("gone");
    setTimeout(() => document.body.classList.remove("locked"), 1200);
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
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));

  // --- RSVP ---
  const form = document.getElementById("rsvpForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const r = C.rsvp || {};
    if (r.formAction && r.fields && r.fields.name) {
      const body = new URLSearchParams();
      ["name", "attend", "message"].forEach(k => { if (r.fields[k]) body.append(r.fields[k], d.get(k) || ""); });
      fetch(r.formAction, { method: "POST", mode: "no-cors", body }).catch(() => {});
    }
    form.querySelector("button").disabled = true;
    document.getElementById("thanks").hidden = false;
  });
})();
