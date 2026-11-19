/* ==========================================================
   SiGMaL - script.js
   Edit the EVENTS and TEAM arrays; the page renders them.
   ========================================================== */

// TODO: replace with your real events. Newest first.
const EVENTS = [
  { date: "2025-12-01", title: "Article Contest for EPOCHS",         type: "Contest", url: "https://joinsigmal.github.io/epochs/" },
  { date: "2025-10-18", title: "Pi-square seminar", type: "Workshop",      url: "https://sites.google.com/ds.study.iitm.ac.in/pisq-seminar-mls" },
  { date: "2025-06-27", title: "LogicLooM 4.0 Finale",   type: "Paradox",        url: "https://joinsigmal.github.io/logicloom4/" }
];

// TODO: replace with your real team. Put photos in /team/ and set `photo`.
const TEAM = [
  { name: "To be Updated",  role: "Core",        photo: "", links: [{ label: "linkedin", url: "#" }] },
];

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- menu ---------- */
const menu = $("#menu");
const openBtn = $("#menu-open");
const closeBtn = $("#menu-close");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menu.setAttribute("aria-hidden", String(!open));
  openBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  if (open) closeBtn.focus(); else openBtn.focus({ preventScroll: true });
}
openBtn.addEventListener("click", () => setMenu(true));
closeBtn.addEventListener("click", () => setMenu(false));
$$("#menu a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  openBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
});

/* ---------- past events ---------- */
(function renderEvents() {
  const list = $("#past-events");
  list.innerHTML = "";
  EVENTS.forEach(ev => {
    const d = new Date(ev.date + "T00:00:00");
    const li = document.createElement("li");

    const when = document.createElement("span");
    when.className = "when";
    when.textContent = d.toLocaleString("en-IN", { month: "long", year: "numeric" });

    const a = document.createElement("a");
    a.href = ev.url || "#";
    a.textContent = ev.title;

    const kind = document.createElement("span");
    kind.className = "kind";
    kind.textContent = ev.type;

    li.append(when, a, kind);
    list.append(li);
  });
})();

/* ---------- team ---------- */
(function renderTeam() {
  const grid = $("#team-grid");
  const initials = n => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  TEAM.forEach(p => {
    const card = document.createElement("div");
    card.className = "person";

    const av = document.createElement("div");
    av.className = "avatar";
    if (p.photo) {
      const img = document.createElement("img");
      img.src = p.photo; img.alt = p.name; img.loading = "lazy";
      av.append(img);
    } else {
      av.textContent = initials(p.name);
    }

    const h = document.createElement("h3");
    h.textContent = p.name;
    const r = document.createElement("p");
    r.className = "role";
    r.textContent = p.role;

    const l = document.createElement("div");
    l.className = "links";
    (p.links || []).forEach(x => {
      const a = document.createElement("a");
      a.href = x.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", x.label);
      
      if (x.label.toLowerCase() === "linkedin") {
          a.innerHTML = '<i class="fa-brands fa-linkedin"></i>';
      } else if (x.label.toLowerCase() === "github") {
          a.innerHTML = '<i class="fa-brands fa-github"></i>';
      } else {
          a.textContent = x.label;
      }
      
      l.append(a);
    });

    card.append(av, h, r, l);
    grid.append(card);
  });
})();

/* ---------- count-up numbers ---------- */
(function countUp() {
  const nums = $$("[data-count]");
  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1000;
      (function tick(now) {
        const t = Math.min((now - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      })(t0);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => { n.textContent = "0"; io.observe(n); });
})();

$("#year").textContent = new Date().getFullYear();


const greetings = [
    "Welcome!",
    "स्वागत है!",
    "স্বাগতম!",
    "స్వాగతం!",
    "நல்வரவு!",
    "ಸ್ವಾಗತ!",
    "സ്വാഗതം!",
    "સ્વાગત છે!",
    "ਸੁਆਗਤ ਹੈ!",
    "ସ୍ୱାଗତ!"
];

const welcomeText = document.getElementById("welcome-text");

let currentIndex = 0;

setInterval(() => {
    welcomeText.classList.add("fade-out");

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % greetings.length;

        welcomeText.textContent = greetings[currentIndex];

        welcomeText.classList.remove("fade-out");
        welcomeText.classList.add("fade-in");

        setTimeout(() => {
            welcomeText.classList.remove("fade-in");
        }, 400);

    }, 400);

}, 2000);
