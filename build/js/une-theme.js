(function () {
  var css =
    ".une.dark{--une-text:#f4efe4;--une-muted:#b8b09c;--une-border:rgb(201 168 76 / 0.28);--une-bg:#111;--une-card:#161616}" +
    ".card.split{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:stretch}" +
    ".card.split .img-col{width:auto!important;max-width:none!important;min-height:0!important;background:#111!important}" +
    ".card.split .img{width:100%!important;height:100%!important;min-height:22rem!important;max-height:none!important;object-fit:cover!important;object-position:center center!important}" +
    ".btn{background:linear-gradient(165deg,#6e5420 0%,#c9a84c 18%,#f6ebb8 38%,#e8d48b 50%,#c9a84c 68%,#5c4618 100%)!important;color:#1a1408!important}" +
    ".btn:hover{filter:brightness(1.08)}" +
    ".btn.sold-out,.btn:disabled{background:#5c5c5c!important;color:#fff!important;filter:none}" +
    "@media (max-width:700px){.card.split{grid-template-columns:1fr}.card.split .img{height:16rem!important;min-height:16rem!important}}";

  function inject(host) {
    var root = host.shadowRoot;
    if (!root || root.querySelector("style[data-cheer-une]")) return;
    var style = document.createElement("style");
    style.setAttribute("data-cheer-une", "");
    style.textContent = css;
    root.appendChild(style);
  }

  function watch(host) {
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (host.shadowRoot) {
        inject(host);
        new MutationObserver(function () {
          inject(host);
        }).observe(host.shadowRoot, { childList: true });
        clearInterval(timer);
      }
      if (tries > 60) clearInterval(timer);
    }, 100);
  }

  document.querySelectorAll("[data-une-organiser]").forEach(watch);
})();
