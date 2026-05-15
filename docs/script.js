function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function setYear() {
  const el = qs("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setupDrawer() {
  const btn = qs("#navToggle");
  const drawer = qs("#navDrawer");
  if (!btn || !drawer) return;

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.hidden = !open;
  }

  setOpen(false);

  btn.addEventListener("click", () => {
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  drawer.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
}

function setupReveal() {
  const els = qsa(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  for (const el of els) io.observe(el);
}

function setupActiveNav() {
  const sections = qsa("section[id]");
  const links = qsa(".nav__link[data-section]");
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        for (const link of links) {
          link.classList.toggle("nav__link--active", link.dataset.section === id);
        }
      }
    }
  }, { rootMargin: "-35% 0px -60% 0px" });

  for (const section of sections) io.observe(section);
}

function setupProjectFilter() {
  const btns = qsa(".filterBtn");
  const cards = qsa("#projectCards .card--proj");
  if (!btns.length || !cards.length) return;

  function filter(tag) {
    for (const btn of btns) {
      btn.classList.toggle("filterBtn--active", btn.dataset.filter === tag);
    }
    for (const card of cards) {
      const tags = (card.dataset.tags || "").split(" ");
      const visible = tag === "all" || tags.includes(tag);
      card.hidden = !visible;
      if (visible) card.classList.add("is-visible");
    }
  }

  for (const btn of btns) {
    btn.addEventListener("click", () => filter(btn.dataset.filter));
  }
}

function setupCopyEmail() {
  for (const el of qsa(".contact--copyable")) {
    const btn = el.querySelector(".copyBtn");
    if (!btn) continue;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = el.dataset.copy;
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add("copyBtn--done");
        setTimeout(() => btn.classList.remove("copyBtn--done"), 2000);
      });
    });
  }
}

function setupBackToTop() {
  const btn = qs("#backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("backToTop--visible", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

setYear();
setupDrawer();
setupReveal();
setupActiveNav();
setupProjectFilter();
setupCopyEmail();
setupBackToTop();
