/**
 * Smart primary download + Other platforms disclosure for CaptionBake.
 */
(function captionBakeDownloads() {
  var primary = document.getElementById("download-primary");
  var toggle = document.getElementById("download-other-toggle");
  var panel = document.getElementById("download-other");
  var winNote = document.getElementById("windows-install-note");
  var thanksDownload = document.getElementById("thanks-download");
  if (!primary || !toggle || !panel) return;

  var PLATFORMS = {
    mac_arm64: {
      id: "download-arm",
      label: "Download for Mac",
      family: "mac",
    },
    mac_intel: {
      id: "download-intel",
      label: "Download for Mac",
      family: "mac",
    },
    win_x64: {
      id: "download-win-x64",
      label: "Download for Windows",
      family: "windows",
    },
    win_arm64: {
      id: "download-win-arm64",
      label: "Download for Windows",
      family: "windows",
    },
  };

  function linkFor(key) {
    var meta = PLATFORMS[key];
    return meta ? document.getElementById(meta.id) : null;
  }

  function detectKey() {
    var ua = navigator.userAgent || "";
    var platform = navigator.platform || "";
    var isMac = /Mac|iPhone|iPad|iPod/.test(platform) || /Mac OS X/.test(ua);
    var isWin = /^Win/.test(platform) || /Windows/.test(ua);
    var isArm =
      /arm64|aarch64|Apple Silicon/i.test(ua) ||
      /arm64|aarch64/i.test(platform) ||
      (typeof navigator.userAgentData === "object" &&
        navigator.userAgentData &&
        /arm/i.test(String(navigator.userAgentData.architecture || "")));

    if (isMac) return "mac_arm64";
    if (isWin) return isArm ? "win_arm64" : "win_x64";
    return "mac_arm64";
  }

  function applyPrimary(key) {
    var meta = PLATFORMS[key] || PLATFORMS.mac_arm64;
    var source = linkFor(key) || linkFor("mac_arm64");
    if (!source) return;
    primary.setAttribute("href", source.getAttribute("href") || "#download");
    primary.textContent = meta.label;
    primary.dataset.platform = key;
    if (thanksDownload) {
      thanksDownload.setAttribute("href", primary.getAttribute("href"));
      thanksDownload.textContent = meta.label;
    }
    if (winNote) winNote.hidden = meta.family !== "windows";
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Hide platforms" : "Other platforms";
  }

  toggle.addEventListener("click", function () {
    setOpen(panel.hidden);
  });

  applyPrimary(detectKey());

  // Refine Windows arch when Client Hints are available.
  if (
    navigator.userAgentData &&
    typeof navigator.userAgentData.getHighEntropyValues === "function"
  ) {
    navigator.userAgentData
      .getHighEntropyValues(["architecture", "platform"])
      .then(function (hints) {
        var arch = String(hints.architecture || "").toLowerCase();
        var plat = String(hints.platform || "").toLowerCase();
        var isArm = arch === "arm" || arch === "arm64";
        if (plat.indexOf("windows") !== -1) {
          applyPrimary(isArm ? "win_arm64" : "win_x64");
        } else if (plat.indexOf("mac") !== -1) {
          applyPrimary("mac_arm64");
        }
      })
      .catch(function () {
        /* keep sync detection */
      });
  }
})();
