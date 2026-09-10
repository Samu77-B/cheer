(function () {
  var STORAGE_KEY = "cheer-privacy-v1";
  var script = document.currentScript;
  var base = (script && script.getAttribute("data-base")) || "/build";
  if (base.length > 1 && base.charAt(base.length - 1) === "/") {
    base = base.slice(0, -1);
  }

  if (localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  var css =
    ".privacy-banner{position:fixed;inset:auto 0 0 0;z-index:300;padding:1rem clamp(1rem,4vw,2rem);background:#161616;border-top:1px solid rgb(201 168 76 / 0.35);color:#f4efe4;font-family:\"Source Sans 3\",\"Segoe UI\",sans-serif;font-size:0.95rem;line-height:1.5;box-shadow:0 -8px 32px rgb(0 0 0 / 0.45)}" +
    ".privacy-banner__inner{max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem 1.25rem}" +
    ".privacy-banner__text{flex:1 1 16rem;margin:0;color:#b8b09c}" +
    ".privacy-banner__text a{color:#c9a84c;text-underline-offset:0.18em}" +
    ".privacy-banner__actions{display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center}" +
    ".privacy-banner__btn{margin:0;padding:0.65rem 1.1rem;border:0;border-radius:2px;background:linear-gradient(165deg,#6e5420 0%,#c9a84c 18%,#f6ebb8 38%,#e8d48b 50%,#c9a84c 68%,#5c4618 100%);color:#1a1408;font:inherit;font-weight:600;cursor:pointer}" +
    ".privacy-banner__btn:hover{filter:brightness(1.08)}" +
    ".privacy-banner__btn:focus-visible{outline:2px solid #e8d48b;outline-offset:3px}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var banner = document.createElement("aside");
  banner.className = "privacy-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Privacy notice");
  banner.setAttribute("aria-live", "polite");

  banner.innerHTML =
    '<div class="privacy-banner__inner">' +
    '<p class="privacy-banner__text">We use essential cookies and local storage so this site works, and third-party services such as Google Fonts and UrNextEvent when you view events or buy tickets. See our <a href="' +
    base +
    '/privacy.html">privacy policy</a> for details.</p>' +
    '<div class="privacy-banner__actions">' +
    '<button type="button" class="privacy-banner__btn">Accept</button>' +
    "</div>" +
    "</div>";

  document.body.appendChild(banner);

  var acceptBtn = banner.querySelector(".privacy-banner__btn");
  acceptBtn.addEventListener("click", function () {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    banner.remove();
  });
})();
