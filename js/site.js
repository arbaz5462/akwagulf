/* Akwa Gulf — site behaviour. No dependencies. */
(function () {
  "use strict";
  var d = document;
  var root = d.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header border once scrolled */
  var header = d.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-stuck", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  var menuBtn = d.querySelector(".menu-btn");
  function setMenu(open) {
    d.body.classList.toggle("menu-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(!d.body.classList.contains("menu-open")); });
    d.querySelectorAll(".nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) { if (m.matches) setMenu(false); });
  }

  /* hero drawing: index each stroke for staggered draw-in */
  var art = d.querySelector(".hero-art");
  if (art) {
    art.querySelectorAll(".ln > *").forEach(function (el, i) {
      el.setAttribute("pathLength", "1");
      el.style.setProperty("--i", i);
    });
  }

  /* reveal on scroll */
  var targets = d.querySelectorAll(".rv, .hero-art");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-in"); });
  }

  /* products: filter + search */
  var grid = d.getElementById("cards");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
    var chips = Array.prototype.slice.call(d.querySelectorAll(".chip"));
    var input = d.getElementById("q");
    var count = d.getElementById("count");
    var empty = d.getElementById("empty");
    var cat = "all";
    function apply() {
      var q = (input && input.value || "").trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var okCat = cat === "all" || c.getAttribute("data-cat") === cat;
        var okQ = !q || c.getAttribute("data-text").indexOf(q) !== -1;
        var show = okCat && okQ;
        c.hidden = !show;
        if (show) shown++;
      });
      if (count) count.textContent = (shown < 10 ? "0" : "") + shown + " / " + (cards.length < 10 ? "0" : "") + cards.length;
      if (empty) empty.hidden = shown !== 0;
    }
    chips.forEach(function (ch) {
      ch.addEventListener("click", function () {
        cat = ch.getAttribute("data-cat");
        chips.forEach(function (o) { o.setAttribute("aria-pressed", o === ch ? "true" : "false"); });
        apply();
      });
    });
    if (input) input.addEventListener("input", apply);
    // deep link: /products#booster etc.
    var h = (location.hash || "").replace("#", "");
    var match = chips.filter(function (c) { return c.getAttribute("data-cat") === h; })[0];
    if (match) match.click();
    apply();
  }

  /* forms (Formspree) */
  d.querySelectorAll("form[data-endpoint]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector("button[type=submit]");
    var label = btn ? btn.innerHTML : "";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector(".hp input") && form.querySelector(".hp input").value) return; // bot
      if (!form.checkValidity()) { form.reportValidity(); return; }
      btn.disabled = true;
      btn.firstChild.textContent = "Sending… ";
      status.className = "form-status";
      status.textContent = "";
      fetch(form.getAttribute("data-endpoint"), {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (r.ok) {
          status.className = "form-status ok";
          status.textContent = "Thank you — we've received your enquiry and will be in touch shortly.";
          form.reset();
        } else { throw new Error("bad"); }
      }).catch(function () {
        status.className = "form-status bad";
        status.textContent = "Something went wrong sending that. Please try again, or call or WhatsApp us directly.";
      }).then(function () {
        btn.disabled = false;
        btn.innerHTML = label;
      });
    });
  });

  /* footer year */
  d.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
