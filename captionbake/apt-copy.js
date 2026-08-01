/**
 * Copy CaptionBake apt install commands from the product page snippet.
 */
(function copyLinuxAptCommands() {
  var btn = document.getElementById("copy-linux-apt");
  var snippet = document.getElementById("linux-apt-snippet");
  var status = document.getElementById("copy-linux-apt-status");
  if (!btn || !snippet) return;

  var resetTimer = null;

  function textToCopy() {
    var code = snippet.querySelector("code") || snippet;
    return String(code.innerText || code.textContent || "")
      .replace(/\u00a0/g, " ")
      .replace(/\r\n/g, "\n")
      .replace(/\s+$/g, "");
  }

  function copyViaExecCommand(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.width = "1px";
    ta.style.height = "1px";
    ta.style.padding = "0";
    ta.style.border = "none";
    ta.style.outline = "none";
    ta.style.boxShadow = "none";
    ta.style.background = "transparent";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (_) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
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

  btn.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var text = textToCopy();
    if (!text) {
      setStatus("Nothing to copy.", false);
      return;
    }

    function ok() {
      setStatus("Copied to clipboard.", true);
    }
    function fail() {
      if (copyViaExecCommand(text)) {
        ok();
        return;
      }
      setStatus("Could not copy — select the commands and copy manually.", false);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, fail);
      return;
    }
    if (copyViaExecCommand(text)) ok();
    else fail();
  });
})();
