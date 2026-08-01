/**
 * Smart primary download + Other platforms disclosure for CaptionBake.
 */
(function captionBakeDownloads() {
  var primary = document.getElementById("download-primary");
  var toggle = document.getElementById("download-other-toggle");
  var panel = document.getElementById("download-other");
  var winNote = document.getElementById("windows-install-note");
  var linuxNote = document.getElementById("linux-apt-note");
  var thanksDownload = document.getElementById("thanks-download");
  if (!primary || !toggle || !panel) return;

  var PLATFORMS = {
    mac: {
      id: "download-arm",
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
    linux_amd64: {
      id: "download-linux-amd64",
      label: "Download for Linux",
      family: "linux",
    },
    linux_arm64: {
      id: "download-linux-arm64",
      label: "Download for Linux",
      family: "linux",
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
    var isLinux =
      (/Linux/.test(platform) || /Linux/.test(ua)) && !/Android/.test(ua);
    var isArm =
      /arm64|aarch64|Apple Silicon/i.test(ua) ||
      /arm64|aarch64/i.test(platform) ||
      (typeof navigator.userAgentData === "object" &&
        navigator.userAgentData &&
        /arm/i.test(String(navigator.userAgentData.architecture || "")));

    if (isMac) return "mac";
    if (isWin) return isArm ? "win_arm64" : "win_x64";
    if (isLinux) return isArm ? "linux_arm64" : "linux_amd64";
    return "mac";
  }

  function applyPrimary(key) {
    var meta = PLATFORMS[key] || PLATFORMS.mac;
    var source = linkFor(key) || linkFor("mac");
    if (!source) return;
    primary.setAttribute("href", source.getAttribute("href") || "#download");
    primary.textContent = meta.label;
    primary.dataset.platform = key;
    if (thanksDownload) {
      thanksDownload.setAttribute("href", primary.getAttribute("href"));
      thanksDownload.textContent = meta.label;
    }
    if (winNote) winNote.hidden = meta.family !== "windows";
    if (linuxNote) linuxNote.hidden = meta.family !== "linux";
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

  // Refine Windows/Linux arch when Client Hints are available.
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
        } else if (plat.indexOf("linux") !== -1) {
          applyPrimary(isArm ? "linux_arm64" : "linux_amd64");
        } else if (plat.indexOf("mac") !== -1) {
          applyPrimary("mac");
        }
      })
      .catch(function () {
        /* keep sync detection */
      });
  }
})();
