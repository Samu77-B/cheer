(function () {
  var CMS_JSON = "/content/site.json";

  function text(el, value) {
    if (el && value) el.textContent = value;
  }

  // Fall back to the digits of the display number when no tel: value is set,
  // so a half-filled pair still renders a working link
  function telHref(display, tel) {
    var value = tel || display || "";
    value = value.replace(/[^\d+]/g, "");
    return value.indexOf("+") > 0 ? value.replace(/\+/g, "") : value;
  }

  function phoneLink(display, tel) {
    return '<a href="tel:' + telHref(display, tel) + '">' + escapeHtml(display) + "</a>";
  }

  function htmlContactBlock(container, settings) {
    if (!container || !settings || !settings.contactEmail) return;
    var email = escapeHtml(settings.contactEmail);
    var parts = ["Email: ", '<a href="mailto:' + email + '">' + email + "</a>"];
    var phones = [];
    if (settings.phoneLandline) {
      phones.push(phoneLink(settings.phoneLandline, settings.phoneLandlineTel));
    }
    if (settings.phoneMobile) {
      phones.push(phoneLink(settings.phoneMobile, settings.phoneMobileTel));
    }
    if (phones.length) {
      parts.push("<br>Phone: ", phones.join(", "));
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

  // Sanity serves originals; ask the CDN for a web-sized version instead
  function cdnImage(url, width) {
    if (!url) return "";
    if (url.indexOf("cdn.sanity.io") === -1) return url;
    return url + "?w=" + width + "&auto=format&fit=max";
  }

  function swapImage(el, picture, width) {
    if (!el || !picture || !picture.url) return;
    el.setAttribute("src", cdnImage(picture.url, width));
    el.removeAttribute("srcset");
    if (picture.alt) el.setAttribute("alt", picture.alt);
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

    var panels = [
      ["home.panelCommunity", home.panelCommunity],
      ["home.panelHealth", home.panelHealth],
      ["home.panelEducation", home.panelEducation],
      ["home.panelEmpowerment", home.panelEmpowerment],
      ["home.panelSabula", home.panelSabula],
      ["home.featureEvents", home.featureEvents],
      ["home.featureSabula", home.featureSabula],
    ];
    panels.forEach(function (entry) {
      swapImage(document.querySelector("[data-cms='" + entry[0] + "'] img"), entry[1], 1200);
    });

    var photoHost = document.querySelector("[data-cms='home.aboutPhotos']");
    if (photoHost && home.aboutPhotos && home.aboutPhotos.length) {
      photoHost.innerHTML = home.aboutPhotos
        .map(function (photo) {
          var img =
            '<img src="' +
            escapeHtml(cdnImage(photo.url, 900)) +
            '" alt="' +
            escapeHtml(photo.alt || "") +
            '">';
          var caption = photo.caption
            ? "<figcaption>" + escapeHtml(photo.caption) + "</figcaption>"
            : "";
          return "<figure>" + img + caption + "</figure>";
        })
        .join("");
    }
  }

  function blockHtml(block) {
    if (!block || !block.kind) return "";
    if (block.kind === "heading") {
      return block.text ? "<h2>" + escapeHtml(block.text) + "</h2>" : "";
    }
    if (block.kind === "numbered" || block.kind === "bullets") {
      var items = (block.items || "")
        .split("\n")
        .map(function (line) {
          return line.trim();
        })
        .filter(Boolean);
      if (!items.length) return "";
      var tag = block.kind === "numbered" ? "ol" : "ul";
      return (
        "<" +
        tag +
        ">" +
        items
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("") +
        "</" +
        tag +
        ">"
      );
    }
    return block.text ? "<p>" + escapeHtml(block.text) + "</p>" : "";
  }

  function applyPage(pages) {
    var slug = document.body.getAttribute("data-page");
    if (!slug || !pages) return;
    var doc = pages[slug];
    if (!doc) return;

    text(document.querySelector("[data-cms='page.eyebrow']"), doc.eyebrow);
    text(document.querySelector("[data-cms='page.heading']"), doc.heading);
    text(document.querySelector("[data-cms='page.lede']"), doc.lede);

    var banner = document.querySelector("[data-cms='page.banner'] img");
    if (banner && doc.bannerUrl) {
      swapImage(banner, { url: doc.bannerUrl, alt: doc.bannerAlt }, 1600);
    }

    var bodyHost = document.querySelector("[data-cms='page.body']");
    if (bodyHost && doc.bodyBlocks && doc.bodyBlocks.length) {
      var html = doc.bodyBlocks.map(blockHtml).join("");
      if (html) bodyHost.innerHTML = html;
    }

    var cards = [
      "cardArts",
      "cardYouth",
      "cardConcerts",
      "cardWellbeing",
      "cardIntergenerational",
      "cardTraining",
    ];
    cards.forEach(function (name) {
      var el = document.querySelector("[data-cms='page." + name + "'] img");
      swapImage(el, doc[name], 900);
    });
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
      applySettings(data.siteSettings);
      applyHome(data.homePage);
      applyPage(data.pages);
      renderAnnouncement(data);
    })
    .catch(function () {
      /* Static HTML remains the source of truth until sync runs */
    });
})();
