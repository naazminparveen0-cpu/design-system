/**
 * Job Notification Tracker — Routes, nav, and saved jobs (localStorage).
 */

(function () {
  var STORAGE_KEY = "jobTracker_saved";
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

  function getSavedJobs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setSavedJobs(jobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }

  function addJob(job) {
    var jobs = getSavedJobs();
    job.id = Date.now().toString();
    job.savedAt = Date.now();
    jobs.unshift(job);
    setSavedJobs(jobs);
  }

  function removeJob(id) {
    var jobs = getSavedJobs().filter(function (j) { return j.id !== id; });
    setSavedJobs(jobs);
  }

  function weekStart() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    return d.getTime();
  }

  function updateDashboard() {
    var jobs = getSavedJobs();
    var weekStartMs = weekStart();
    var thisWeek = jobs.filter(function (j) { return j.savedAt >= weekStartMs; }).length;
    var savedEl = document.getElementById("dashboard-saved-count");
    var weekEl = document.getElementById("dashboard-week-count");
    var recentEl = document.getElementById("dashboard-recent-list");
    if (savedEl) savedEl.textContent = jobs.length;
    if (weekEl) weekEl.textContent = thisWeek;
    if (recentEl) {
      if (jobs.length === 0) {
        recentEl.innerHTML = "<div class=\"kn-dashboard__empty\"><p class=\"kn-dashboard__empty-text\">No notifications yet.</p><p class=\"kn-dashboard__empty-hint\">When you save jobs or receive digests, they will appear here.</p></div>";
      } else {
        var html = "<ul class=\"kn-dashboard__recent-ul\">";
        jobs.slice(0, 5).forEach(function (j) {
          var title = (j.title || "Untitled").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          var company = (j.company || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          var label = company ? title + " · " + company : title;
          html += "<li class=\"kn-dashboard__recent-li\">" + label + "</li>";
        });
        html += "</ul>";
        recentEl.innerHTML = html;
      }
    }
  }

  function updateSavedPage() {
    var container = document.getElementById("saved-list");
    if (!container) return;
    var jobs = getSavedJobs();
    if (jobs.length === 0) {
      container.innerHTML = "<div class=\"kn-saved-empty\"><p class=\"kn-saved-empty__text\">No saved jobs yet.</p><p class=\"kn-saved-empty__hint\">Use the form above to save a job.</p></div>";
      return;
    }
    var html = "<ul class=\"kn-saved-ul\">";
    jobs.forEach(function (j) {
      var title = (j.title || "Untitled").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var company = (j.company || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var link = j.url ? "<a href=\"" + j.url.replace(/"/g, "&quot;") + "\" target=\"_blank\" rel=\"noopener\" class=\"kn-saved-item__link\">View</a>" : "";
      html += "<li class=\"kn-saved-item\" data-id=\"" + j.id + "\"><div class=\"kn-saved-item__main\"><span class=\"kn-saved-item__title\">" + title + "</span>" + (company ? " <span class=\"kn-saved-item__company\">" + company + "</span>" : "") + " " + link + "</div><button type=\"button\" class=\"kn-btn kn-btn--secondary kn-saved-item__remove\" aria-label=\"Remove\">Remove</button></li>";
    });
    html += "</ul>";
    container.innerHTML = html;
    container.querySelectorAll(".kn-saved-item__remove").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.closest(".kn-saved-item").getAttribute("data-id");
        removeJob(id);
        updateSavedPage();
        updateDashboard();
      });
    });
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

    if (activePath === "/dashboard") updateDashboard();
    if (activePath === "/saved") updateSavedPage();
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
    var form = document.getElementById("saved-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var title = (form.querySelector("[name=title]") || {}).value.trim();
        var company = (form.querySelector("[name=company]") || {}).value.trim();
        var url = (form.querySelector("[name=url]") || {}).value.trim();
        if (!title) return;
        addJob({ title: title, company: company || undefined, url: url || undefined });
        form.reset();
        updateSavedPage();
        updateDashboard();
      });
    }
  });
})();
