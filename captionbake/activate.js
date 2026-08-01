/**
 * Post-purchase handoff from Lemon Squeezy confirmation.
 * URL: https://www.corelogic.cc/captionbake/?key=[license_key]
 */
(function showLicenseFromQuery() {
  var params = new URLSearchParams(window.location.search);
  var key = (params.get("key") || "").trim();
  // Lemon license keys are UUID-like; reject anything that isn't safe to display.
  if (!/^[A-Za-z0-9-]{8,80}$/.test(key)) return;

  var panel = document.getElementById("purchase-thanks");
  var input = document.getElementById("license-key-value");
  var copyBtn = document.getElementById("copy-license-key");
  var status = document.getElementById("copy-license-status");
  var thanksDownload = document.getElementById("thanks-download");
  var heroDownload = document.getElementById("download-arm");
  if (!panel || !input || !copyBtn) return;

  input.value = key;
  panel.hidden = false;

  if (thanksDownload && heroDownload) {
    thanksDownload.setAttribute("href", heroDownload.getAttribute("href") || "#download");
  }

  // Drop the key from the address bar so it isn't left in the visible URL.
  try {
    var clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", clean);
  } catch (_) {
    /* ignore */
  }

  copyBtn.addEventListener("click", function () {
    function ok() {
      if (status) status.textContent = "Copied — paste it in CaptionBake → Settings → License.";
      input.focus();
      input.select();
    }
    function fail() {
      if (status) status.textContent = "Select the key and copy it manually (⌘C).";
      input.focus();
      input.select();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(key).then(ok, fail);
    } else {
      try {
        input.select();
        document.execCommand("copy");
        ok();
      } catch (_) {
        fail();
      }
    }
  });

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
})();

(function copyLinuxAptCommands() {
  var btn = document.getElementById("copy-linux-apt");
  var snippet = document.getElementById("linux-apt-snippet");
  var status = document.getElementById("copy-linux-apt-status");
  if (!btn || !snippet) return;

  var resetTimer = null;

  function textToCopy() {
    var code = snippet.querySelector("code");
    return ((code && code.textContent) || snippet.textContent || "").replace(/\s+$/, "");
  }

  function setStatus(msg, copied) {
    if (status) status.textContent = msg || "";
    btn.classList.toggle("is-copied", Boolean(copied));
    btn.textContent = copied ? "Copied" : "Copy";
    if (resetTimer) clearTimeout(resetTimer);
    if (copied) {
      resetTimer = setTimeout(function () {
        btn.classList.remove("is-copied");
        btn.textContent = "Copy";
        if (status) status.textContent = "";
      }, 2000);
    }
  }

  btn.addEventListener("click", function () {
    var text = textToCopy();
    function ok() {
      setStatus("Copied to clipboard.", true);
    }
    function fail() {
      setStatus("Could not copy — select the commands and copy manually.", false);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, fail);
      return;
    }
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      ok();
    } catch (_) {
      fail();
    }
  });
})();
