(function () {
  "use strict";

  /* ─── Safety wrapper ─────────────────────────────────────────── */
  function safe(fn, name) {
    try { fn(); }
    catch (e) { console.warn("[TN] " + name + " failed:", e.message); }
  }

  /* ─── Helpers ────────────────────────────────────────────────── */
  var qs  = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.from((r || document).querySelectorAll(s)); };

  /* ─── Smooth scroll for anchor links ────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href^='#']");
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = (qs(".site-nav") || {}).offsetHeight || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: "smooth" });
      /* Close mobile menu if open */
      var burger = qs(".nav-burger");
      var menu   = qs(".mobile-menu");
      if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
      if (menu)   { menu.classList.remove("is-open");   menu.setAttribute("aria-hidden", "true"); }
    });
  }

  /* ─── Nav: scrolled state + mobile burger ────────────────────── */
  function initNav() {
    var nav    = qs(".site-nav");
    var burger = qs(".nav-burger");
    var menu   = qs(".mobile-menu");
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!burger || !menu) return;
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("is-open");
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.classList.contains("is-open")) {
        burger.classList.remove("is-open");
        menu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        burger.focus();
      }
    });

    var sections = qsa("section[id]");
    var links    = qsa(".nav-link");
    function highlightNav() {
      var scrollY = window.scrollY + 120;
      var current = "";
      sections.forEach(function (s) {
        if (s.offsetTop <= scrollY) current = s.id;
      });
      links.forEach(function (l) {
        var href = l.getAttribute("href").slice(1);
        l.classList.toggle("is-active", href === current);
      });
    }
    window.addEventListener("scroll", highlightNav, { passive: true });
    highlightNav();
  }

  /* ─── Mouse-reactive gradient ────────────────────────────────── */
  function initMouseGradient() {
    var el = qs("[data-mouse-gradient]");
    if (!el) return;
    var W = window.innerWidth;
    var H = window.innerHeight;
    var cx = 0.5, cy = 0.4;
    var tx = cx, ty = cy;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);
      el.style.setProperty("--mx", (cx * 100).toFixed(2) + "%");
      el.style.setProperty("--my", (cy * 100).toFixed(2) + "%");
      requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX / W;
      ty = e.clientY / H;
    }, { passive: true });

    window.addEventListener("resize", function () {
      W = window.innerWidth;
      H = window.innerHeight;
    }, { passive: true });

    requestAnimationFrame(tick);
  }

  /* ─── Custom cursor ──────────────────────────────────────────── */
  function initCursor() {
    var cursor = qs(".cursor");
    if (!cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    var dot  = qs(".cursor-dot",  cursor);
    var ring = qs(".cursor-ring", cursor);
    var x = -100, y = -100, rx = -100, ry = -100;
    var ready = false;

    window.addEventListener("mousemove", function (e) {
      if (!ready) {
        ready = true;
        cursor.classList.add("is-ready");
      }
      x = e.clientX;
      y = e.clientY;
    }, { passive: true });

    function trackCursor() {
      if (dot)  { dot.style.transform  = "translate(" + (x - 4)  + "px, " + (y - 4)  + "px)"; }
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      if (ring) { ring.style.transform = "translate(" + (rx - 18) + "px, " + (ry - 18) + "px)"; }
      requestAnimationFrame(trackCursor);
    }
    requestAnimationFrame(trackCursor);

    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, [role='button'], input, textarea, select")) {
        cursor.classList.add("cursor-hover");
      }
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest("a, button, [role='button'], input, textarea, select")) {
        cursor.classList.remove("cursor-hover");
      }
    });
  }

  /* ─── Scroll reveals (IntersectionObserver) ──────────────────── */
  function initReveals() {
    var items = qsa(".reveal");
    if (!items.length) return;

    /* Stagger delay for card groups */
    var groups = [".entry-card", ".enterprise-card", ".why-item", ".team-card", ".stat-pill"];
    groups.forEach(function (sel) {
      qsa(sel).forEach(function (card, idx) {
        if (!card.dataset.delay) card.dataset.delay = idx * 100;
      });
    });

    items.forEach(function (el, i) {
      el.style.transitionDelay = (el.dataset.delay || (i % 4) * 80) + "ms";
    });

    /* Safety timeout — reveal everything after 6s */
    var safeTimer = setTimeout(function () {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }, 6000);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
      if (items.every(function (el) { return el.classList.contains("is-visible"); })) {
        clearTimeout(safeTimer);
      }
    }, { threshold: 0.02, rootMargin: "0px 0px -30px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ─── Count-up stats ─────────────────────────────────────────── */
  function initCountUp() {
    var stats = qsa(".stat-num[data-target]");
    if (!stats.length) return;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animateStat(el) {
      var target = parseFloat(el.dataset.target);
      var suffix = el.dataset.suffix || "";
      var dur    = 1400;
      var start  = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / dur, 1);
        var val = target * easeOut(progress);
        el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function (el) { io.observe(el); });
  }

  /* ─── Card hover tilt ────────────────────────────────────────── */
  function initCardHover() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    qsa(".entry-card, .enterprise-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var cx   = rect.left + rect.width  / 2;
        var cy   = rect.top  + rect.height / 2;
        var dx   = (e.clientX - cx) / (rect.width  / 2);
        var dy   = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = "perspective(900px) rotateY(" + (dx * 4) + "deg) rotateX(" + (-dy * 3) + "deg) translateZ(6px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ─── Form handler ───────────────────────────────────────────── */
  function initForms() {
    var form = qs(".contact-form");
    if (!form) return;

    var emailField = qs("[type='email']", form);
    if (emailField) {
      emailField.addEventListener("blur", function () {
        var val = emailField.value.trim();
        emailField.setCustomValidity(
          val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
            ? "Por favor ingrese un email válido."
            : ""
        );
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = qs("[type='submit']", form);
      if (btn) {
        btn.textContent = "Enviando…";
        btn.disabled = true;
      }

      setTimeout(function () {
        form.innerHTML = [
          '<div class="form-success" role="alert">',
          '  <div class="success-icon" aria-hidden="true">✓</div>',
          '  <h3 class="success-title">Mensaje recibido</h3>',
          '  <p class="success-body">Nos pondremos en contacto en las próximas 24 horas hábiles para coordinar su sesión de descubrimiento.</p>',
          '</div>'
        ].join("");
      }, 900);
    });
  }

  /* ─── Hero scroll cue fade ───────────────────────────────────── */
  function initScrollCue() {
    var cue = qs(".hero-scroll-cue");
    if (!cue) return;
    window.addEventListener("scroll", function () {
      cue.style.opacity = window.scrollY > 80 ? "0" : "1";
    }, { passive: true });
  }

  /* ─── Service card tag badge ─────────────────────────────────── */
  function initCardTags() {
    qsa(".service-tag").forEach(function (tag) {
      if (tag.textContent.trim() === "RECOMENDADO") {
        tag.classList.add("tag-pulse");
      }
    });
  }

  /* ─── GSAP ScrollTrigger animations ─────────────────────────── */
  function initGsap() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    /* Hero parallax */
    var heroImg = qs(".hero-bg-img");
    if (heroImg) {
      gsap.to(heroImg, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    /* Hero content gentle fade on scroll */
    var heroInner = qs(".hero-inner");
    if (heroInner) {
      gsap.to(heroInner, {
        y: 60,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "60% top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    /* Section images parallax */
    qsa(".section-img").forEach(function (img) {
      gsap.to(img, {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: img.closest("section") || img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    /* Enterprise cards stagger */
    var ecards = qsa(".enterprise-card");
    if (ecards.length) {
      gsap.fromTo(ecards,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ecards[0].closest("section") || ecards[0],
            start: "top 75%"
          }
        }
      );
    }

    /* Why-us items alternating slide */
    qsa(".why-item").forEach(function (item, i) {
      gsap.fromTo(item,
        { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" }
        }
      );
    });

    /* Team cards pop-in */
    var teamCards = qsa(".team-card");
    if (teamCards.length) {
      gsap.fromTo(teamCards,
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: teamCards[0].closest("section") || teamCards[0],
            start: "top 80%"
          }
        }
      );
    }
  }

  /* ─── Boot ───────────────────────────────────────────────────── */
  function boot() {
    safe(initSmoothScroll,  "SmoothScroll");
    safe(initNav,           "Nav");
    safe(initMouseGradient, "MouseGradient");
    safe(initCursor,        "Cursor");
    safe(initReveals,       "Reveals");
    safe(initCountUp,       "CountUp");
    safe(initCardHover,     "CardHover");
    safe(initForms,         "Forms");
    safe(initScrollCue,     "ScrollCue");
    safe(initCardTags,      "CardTags");
    safe(initGsap,          "GSAP");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
