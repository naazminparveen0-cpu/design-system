/**
 * Job Notification Tracker — Route shell & nav
 * Client-side routing and hamburger toggle. No content or data logic.
 */

(function () {
  var routes = [
    { path: "/", id: "route-home", title: "Home" },
    { path: "/dashboard", id: "route-dashboard", title: "Dashboard" },
    { path: "/settings", id: "route-settings", title: "Settings" },
    { path: "/saved", id: "route-saved", title: "Saved" },
    { path: "/digest", id: "route-digest", title: "Digest" },
    { path: "/proof", id: "route-proof", title: "Proof" },
  ];

  function getPath() {
    return window.location.pathname.replace(/\/$/, "") || "/";
  }

  function render() {
    var path = getPath();
    var route = routes.find(function (r) {
      return r.path === path;
    });
    var activePath = route ? route.path : "/";

    routes.forEach(function (r) {
      var el = document.getElementById(r.id);
      if (el) el.classList.toggle("kn-app-route--active", r.path === activePath);
    });

    var links = document.querySelectorAll(".kn-app-nav__link[data-route]");
    links.forEach(function (link) {
      var isActive = link.getAttribute("data-route") === activePath;
      link.classList.toggle("kn-app-nav__link--active", isActive);
    });
  }

  function onNavClick(e) {
    var link = e.target.closest("a[data-route][href]");
    if (!link) return;
    e.preventDefault();
    var path = link.getAttribute("data-route") || link.getAttribute("href");
    window.history.pushState({}, "", path);
    render();
    closeMobileMenu();
  }

  function toggleMobileMenu() {
    var list = document.querySelector(".kn-app-nav__list");
    if (list) list.classList.toggle("kn-app-nav__list--open");
  }

  function closeMobileMenu() {
    var list = document.querySelector(".kn-app-nav__list");
    if (list) list.classList.remove("kn-app-nav__list--open");
  }

  window.addEventListener("popstate", render);
  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.querySelector(".kn-app-nav")?.addEventListener("click", onNavClick);
    document.querySelector(".kn-app-nav__toggle")?.addEventListener("click", toggleMobileMenu);
  });
})();
