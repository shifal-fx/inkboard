document.documentElement.classList.add("js"); // lets CSS hide .reveal items only when JS is running

/* =========================================================
   Inkboard — shared JavaScript
   Every page loads this one file. It:
   1. Builds the navbar and footer (so you edit them in ONE place)
   2. Highlights the current page in the navbar
   3. Handles the mobile menu
   4. Adds a shadow to the navbar when you scroll
   5. Fades sections in as they scroll into view
   6. Runs page features: use-case tabs, pricing toggle,
      help-center search, sign-up form validation
   ========================================================= */

/* ---------- 1. Navbar & footer templates ---------- */
const LOGO_SVG = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 18c3-1 5-7 8-7s3 5 8 3"/><circle cx="6" cy="6" r="1.6" fill="currentColor"/>
  </svg>`;

const NAV_HTML = `
  <nav class="navbar" id="navbar">
    <div class="container nav-inner">
      <a href="index.html" class="logo"><span class="logo-mark">${LOGO_SVG}</span>Inkboard</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" data-page="home">Home</a></li>
        <li><a href="product.html" data-page="product">Product</a></li>
        <li><a href="pricing.html" data-page="pricing">Pricing</a></li>
        <li><a href="help.html" data-page="help">Help</a></li>
        <li class="mobile-only"><a href="signup.html">Log in</a></li>
        <li class="mobile-only"><a href="signup.html" class="btn btn-primary btn-block">Sign up free</a></li>
      </ul>
      <div class="nav-actions">
        <a href="signup.html" class="login">Log in</a>
        <a href="signup.html" class="btn btn-primary">Sign up free</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
  </nav>`;

const FOOTER_HTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo"><span class="logo-mark">${LOGO_SVG}</span>Inkboard</a>
          <p>The online whiteboard where teams brainstorm, plan and build ideas together, from anywhere.</p>
          <div class="socials">
            <a href="#" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L.8 3h6.8l4.7 6.2L17.5 3Zm-1.2 16h1.8L6.8 4.9H4.9L16.3 19Z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9L15.5 12l-5.8 3.1Z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li><a href="product.html">Features</a></li>
            <li><a href="product.html#integrations">Integrations</a></li>
            <li><a href="index.html#templates">Templates</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="product.html#security">Security</a></li>
          </ul>
        </div>
        <div>
          <h4>Solutions</h4>
          <ul>
            <li><a href="index.html#usecases">For teams</a></li>
            <li><a href="index.html#usecases">For education</a></li>
            <li><a href="index.html#usecases">For designers</a></li>
            <li><a href="index.html#usecases">For engineers</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="help.html">Help center</a></li>
            <li><a href="help.html#faq">FAQs</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="help.html#contact">Contact</a></li>
            <li><a href="#">Press kit</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> Inkboard, Inc. All rights reserved.</span>
        <div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div>
      </div>
    </div>
  </footer>`;

/* Insert the navbar & footer into the empty placeholders on each page */
document.getElementById("site-nav")?.insertAdjacentHTML("afterbegin", NAV_HTML);
document.getElementById("site-footer")?.insertAdjacentHTML("afterbegin", FOOTER_HTML);
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- 2. Highlight the current page ---------- */
const currentPage = document.body.dataset.page; // set by <body data-page="...">
document.querySelectorAll(".nav-links a[data-page]").forEach(link => {
  if (link.dataset.page === currentPage) link.classList.add("active");
});

/* ---------- 3. Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

/* ---------- 4. Navbar shadow on scroll ---------- */
const navbar = document.getElementById("navbar");
const onScroll = () => navbar?.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 5. Reveal-on-scroll ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------- 5b. Subtle motion (all skipped for prefers-reduced-motion) ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Hero headline: wrap each word in a span so CSS can fade them up one by one */
if (!reduceMotion) {
  let wordIndex = 0;
  const wrapWords = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const span = document.createElement("span");
          span.className = "word";
          span.style.setProperty("--i", wordIndex++);
          span.textContent = part;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child); // e.g. the italic <em> words
      }
    });
  };
  document.querySelectorAll(".hero h1, .page-hero h1").forEach(h1 => { wordIndex = 0; wrapWords(h1); });
}

/* Dotted grid glows brighter around the mouse — mouse/trackpad devices only */
if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const root = document.documentElement;
  root.classList.add("grid-glow");
  let frame = null;
  window.addEventListener("pointermove", e => {
    root.classList.add("pointer-in");
    if (frame) return;
    frame = requestAnimationFrame(() => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
      frame = null;
    });
  }, { passive: true });
  document.addEventListener("mouseleave", () => root.classList.remove("pointer-in"));
}

/* Stats count up from 0 when they scroll into view ("2M+", "4.8★" keep their suffix) */
const statEls = document.querySelectorAll(".stat strong");
if (statEls.length && !reduceMotion) {
  const parse = el => {
    const m = el.textContent.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
    return m && { target: parseFloat(m[1]), decimals: (m[1].split(".")[1] || "").length, suffix: m[2] };
  };
  const countUp = (el, { target, decimals, suffix }) => {
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countUp(entry.target, entry.target._stat);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => {
    const stat = parse(el);
    if (!stat) return;
    el._stat = stat;
    el.textContent = (0).toFixed(stat.decimals) + stat.suffix;
    statObserver.observe(el);
  });
}

/* ---------- 6a. Use-case tabs (home page) ---------- */
document.querySelectorAll("[data-tabs]").forEach(group => {
  const tabs = group.querySelectorAll(".tab");
  const panels = group.querySelectorAll(".tab-panel");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      group.querySelector(`#${tab.dataset.target}`).classList.add("active");
    });
  });
});

/* ---------- 6b. Monthly / yearly pricing toggle ---------- */
const billingButtons = document.querySelectorAll(".billing-toggle button");
billingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    billingButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const period = btn.dataset.billing; // "monthly" or "yearly"
    document.querySelectorAll("[data-monthly]").forEach(priceEl => {
      priceEl.style.opacity = 0;
      setTimeout(() => {
        priceEl.textContent = priceEl.dataset[period];
        priceEl.style.opacity = 1;
      }, 150);
    });
    document.querySelectorAll("[data-note-monthly]").forEach(note => {
      note.textContent = period === "yearly" ? note.dataset.noteYearly : note.dataset.noteMonthly;
    });
  });
});

/* ---------- 6c. Help-center search ---------- */
const helpSearch = document.getElementById("helpSearch");
if (helpSearch) {
  const items = document.querySelectorAll("[data-search]");
  const noResults = document.getElementById("noResults");
  const runSearch = () => {
    const q = helpSearch.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(item => {
      const match = item.dataset.search.toLowerCase().includes(q) || item.textContent.toLowerCase().includes(q);
      item.style.display = match ? "" : "none";
      if (match) shown++;
    });
    noResults.style.display = shown ? "none" : "block";
  };
  helpSearch.addEventListener("input", runSearch);
  document.querySelectorAll(".popular-tags button").forEach(tag => {
    tag.addEventListener("click", () => { helpSearch.value = tag.textContent; runSearch(); helpSearch.focus(); });
  });
}

/* ---------- 6d. Sign-up form validation (demo only, nothing is sent) ---------- */
const signupForm = document.getElementById("signupForm");
signupForm?.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  const check = (id, test) => {
    const field = document.getElementById(id).closest(".field");
    const ok = test(document.getElementById(id).value.trim());
    field.classList.toggle("error", !ok);
    if (!ok) valid = false;
  };
  check("name", v => v.length >= 2);
  check("email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  check("password", v => v.length >= 8);
  if (valid) {
    document.getElementById("formSuccess").style.display = "block";
    signupForm.reset();
  }
});
