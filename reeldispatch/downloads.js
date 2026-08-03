/**
 * Resolve macOS DMG download links from releases.corelogic.cc latest.json.
 */
(function reelDispatchDownloads() {
  var LATEST_URL = "https://releases.corelogic.cc/reeldispatch/latest.json";
  var primary = document.getElementById("download-primary");
  var thanksDownload = document.getElementById("thanks-download");
  var versionEl = document.getElementById("download-version");
  var versionSep = document.getElementById("download-version-sep");

  function applyUrl(url, version) {
    if (!url) return;
    if (primary) {
      primary.setAttribute("href", url);
      primary.removeAttribute("aria-disabled");
    }
    if (thanksDownload) {
      thanksDownload.setAttribute("href", url);
      thanksDownload.removeAttribute("aria-disabled");
    }
    if (versionEl && version) {
      versionEl.textContent = "v" + version;
      versionEl.hidden = false;
      if (versionSep) versionSep.hidden = false;
    }
  }

  fetch(LATEST_URL + "?t=" + Date.now(), { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("latest.json " + res.status);
      return res.json();
    })
    .then(function (data) {
      applyUrl(data && data.url, data && data.version);
    })
    .catch(function () {
      /* Keep placeholder hrefs; user can still use email / contact. */
    });
})();
