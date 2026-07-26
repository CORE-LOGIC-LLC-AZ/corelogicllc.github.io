(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (!open) closeAllDropdowns();
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        closeAllDropdowns();
      });
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".nav-dropdown.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var btn = item.querySelector(".nav-dropdown-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  document.querySelectorAll(".nav-dropdown").forEach(function (item) {
    var btn = item.querySelector(".nav-dropdown-toggle");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var willOpen = !item.classList.contains("is-open");
      closeAllDropdowns();
      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function () {
    closeAllDropdowns();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllDropdowns();
  });
})();
