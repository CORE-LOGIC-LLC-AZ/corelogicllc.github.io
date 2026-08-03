/**
 * Post-purchase handoff from Lemon Squeezy confirmation.
 * URL: https://www.corelogic.cc/reeldispatch/?key=[license_key]
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
  var heroDownload = document.getElementById("download-primary");
  if (!panel || !input || !copyBtn) return;

  input.value = key;
  panel.hidden = false;

  if (thanksDownload && heroDownload) {
    thanksDownload.setAttribute(
      "href",
      heroDownload.getAttribute("href") || "#download",
    );
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
      if (status) {
        status.textContent =
          "Copied — paste it in ReelDispatch under “Have a license key?”.";
      }
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
