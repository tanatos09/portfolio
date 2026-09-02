(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  var lists = document.querySelectorAll("[data-article-list]");
  if (!lists.length) return;

  var params = new URLSearchParams(window.location.search);
  var initialCategory = params.get("kategorie") || "all";
  var initialSort = params.get("razeni") || "newest";

  lists.forEach(function (list) {
    initFilters(list, initialCategory, initialSort);
  });

  function initFilters(list, category, sort) {
    var section = list.closest("section") || document;
    var pills = Array.prototype.slice.call(section.querySelectorAll("[data-filter]"));
    var sortSelect = section.querySelector("[data-sort]");
    var empty = section.querySelector("[data-empty]");
    var cards = Array.prototype.slice.call(list.querySelectorAll(".article-card, .note-card"));

    pills.forEach(function (pill) {
      var filter = pill.getAttribute("data-filter");
      if (filter === "all") return;
      var hasCards = cards.some(function (card) {
        return card.getAttribute("data-category") === filter;
      });
      pill.hidden = !hasCards;
    });

    var activePill = pills.find(function (pill) {
      return pill.getAttribute("data-filter") === category && !pill.hidden;
    });
    if (!activePill) category = "all";

    function apply() {
      list.setAttribute("data-active-filter", category);

      cards.sort(function (a, b) {
        var da = a.getAttribute("data-date");
        var db = b.getAttribute("data-date");
        return sort === "oldest" ? da.localeCompare(db) : db.localeCompare(da);
      });

      var visibleCount = 0;
      cards.forEach(function (card) {
        var cardCategory = card.getAttribute("data-category");
        var match =
          category === "all"
            ? cardCategory !== "poznamky"
            : cardCategory === category;
        card.hidden = !match;
        list.appendChild(card);
        if (match) visibleCount += 1;
      });

      if (empty) empty.hidden = visibleCount > 0;
    }

    pills.forEach(function (pill) {
      var isActive = pill.getAttribute("data-filter") === category;
      pill.classList.toggle("is-active", isActive);
      pill.setAttribute("aria-pressed", isActive ? "true" : "false");
      pill.addEventListener("click", function () {
        if (pill.hidden) return;
        category = pill.getAttribute("data-filter");
        pills.forEach(function (p) {
          var on = p === pill;
          p.classList.toggle("is-active", on);
          p.setAttribute("aria-pressed", on ? "true" : "false");
        });
        updateUrl();
        apply();
      });
    });

    if (sortSelect) {
      sortSelect.value = sort;
      sortSelect.addEventListener("change", function () {
        sort = sortSelect.value;
        updateUrl();
        apply();
      });
    }

    function updateUrl() {
      var next = new URLSearchParams();
      if (category && category !== "all") next.set("kategorie", category);
      if (sort && sort !== "newest") next.set("razeni", sort);
      var qs = next.toString();
      var url = window.location.pathname + (qs ? "?" + qs : "");
      window.history.replaceState({}, "", url);
    }

    apply();
  }
})();
