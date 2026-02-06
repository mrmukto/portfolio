/* Minimal JS: mobile nav toggle + scroll reveal */

function qs(sel) {
  return document.querySelector(sel);
}

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
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) setOpen(false);
  });
}

function setupReveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  for (const el of els) io.observe(el);
}

setYear();
setupDrawer();
setupReveal();

