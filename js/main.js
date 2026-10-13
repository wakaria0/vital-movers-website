/* ============================================================
   Vital Movers & Cleaning Services - shared interactions
   ============================================================ */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "254706545513"; // 0706545513 -> +254 706 545 513

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  // Sticky header shadow on scroll
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  // Mobile nav toggle
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Quote form -> opens WhatsApp with a pre-filled message (no backend needed)
  function initQuoteForm(formId) {
    var quoteForm = document.getElementById(formId);
    if (!quoteForm) return;

    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = quoteForm.elements["name"].value.trim();
      var phone = quoteForm.elements["phone"].value.trim();
      var service = quoteForm.elements["service"].value;
      var details = quoteForm.elements["details"].value.trim();

      var text =
        "Hello Vital Movers & Cleaning Services!" +
        "\n\nI'd like a quote." +
        (name ? "\nName: " + name : "") +
        (service ? "\nService: " + service : "") +
        (phone ? "\nMy phone: " + phone : "") +
        (details ? "\nDetails: " + details : "");

      var params = new URLSearchParams();
      params.set("text", text);
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?" + params.toString(), "_blank");

      var note = document.getElementById("form-note");
      if (note) note.textContent = "WhatsApp is opening with your message - just press send.";
    });
  }

  // Initialize quote forms on all pages
  initQuoteForm("quote-form"); // contact.html

  // Add quote forms to service pages if they don't exist
  document.addListener || document.addEventListener
  // Check for service page quote form variants
  if (document.getElementById("service-quote-form")) {
    initQuoteForm("service-quote-form");
  }
})();