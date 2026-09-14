(function () {
  var CMS_JSON = "/content/site.json";

  function text(el, value) {
    if (el && value) el.textContent = value;
  }

  function htmlContactBlock(container, settings) {
    if (!container || !settings || !settings.contactEmail) return;
    var email = settings.contactEmail;
    var parts = [
      "Email: ",
      '<a href="mailto:' + email + '">' + email + "</a>",
    ];
    if (settings.phoneLandline && settings.phoneLandlineTel) {
      parts.push(
        "<br>Phone: ",
        '<a href="tel:' +
          settings.phoneLandlineTel +
          '">' +
          settings.phoneLandline +
          "</a>"
      );
    }
    if (settings.phoneMobile && settings.phoneMobileTel) {
      parts.push(
        ", ",
        '<a href="tel:' +
          settings.phoneMobileTel +
          '">' +
          settings.phoneMobile +
          "</a>"
      );
    }
    parts.push('<br><a href="/contact.html">Contact page</a>');
    container.innerHTML = parts.join("");
  }

  function renderAnnouncement(data) {
    var list = data.announcements;
    if (!list || !list.length) return;
    var item = list[0];
    var bar = document.createElement("aside");
    bar.className = "cms-announcement";
    bar.setAttribute("role", "status");
    var inner = document.createElement("div");
    inner.className = "wrap cms-announcement-inner";
    var strong = document.createElement("strong");
    strong.textContent = item.title;
    inner.appendChild(strong);
    if (item.message) {
      var msg = document.createElement("span");
      msg.textContent = " — " + item.message;
      inner.appendChild(msg);
    }
    if (item.linkUrl) {
      var link = document.createElement("a");
      link.href = item.linkUrl;
      link.textContent = item.linkLabel || "Learn more";
      link.className = "cms-announcement-link";
      inner.appendChild(document.createTextNode(" "));
      inner.appendChild(link);
    }
    bar.appendChild(inner);
    var header = document.querySelector(".site-header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(bar, header);
    }
  }

  function applyHome(home) {
    if (!home) return;
    text(document.querySelector("[data-cms='home.heroLede']"), home.heroLede);
    text(document.querySelector("[data-cms='home.impactNote']"), home.impactNote);
    text(document.querySelector("[data-cms='home.joinBlurb']"), home.joinBlurb);
    var aboutHost = document.querySelector("[data-cms='home.aboutParagraphs']");
    if (aboutHost && home.aboutParagraphs && home.aboutParagraphs.length) {
      aboutHost.innerHTML = home.aboutParagraphs
        .map(function (p) {
          return "<p>" + escapeHtml(p) + "</p>";
        })
        .join("");
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applySettings(settings) {
    if (!settings) return;
    text(
      document.querySelector("[data-cms='settings.safeguarding']"),
      settings.safeguardingBlurb
    );
    text(
      document.querySelector("[data-cms='settings.charity']"),
      settings.charityRegistration
    );
    text(document.querySelector("[data-cms='settings.social']"), settings.socialBlurb);
    htmlContactBlock(
      document.querySelector("[data-cms='settings.contactHtml']"),
      settings
    );
  }

  fetch(CMS_JSON, { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("CMS JSON missing");
      return res.json();
    })
    .then(function (data) {
      if (!data.siteSettings && !data.homePage && !(data.announcements || []).length) {
        return;
      }
      applySettings(data.siteSettings);
      applyHome(data.homePage);
      renderAnnouncement(data);
    })
    .catch(function () {
      /* Static HTML remains the source of truth until sync runs */
    });
})();
