document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optin-form");
  const confirmation = document.getElementById("confirmation");
  const phoneInput = document.getElementById("phone");

  function normalizeNumber(input) {
    // Remove common separators and letters
    const digits = input.replace(/[^\d+]/g, "");
    // If it starts with "+" keep it; otherwise remove leading zeros
    return digits;
  }

  function isPlausiblePhone(n) {
    // Accept numbers with 10-15 digits (allow leading +)
    const stripped = n.replace(/[^\d]/g, "");
    return stripped.length >= 10 && stripped.length <= 15;
  }

  function prettyFormat(n) {
    // Very small formatting: keep + if present, otherwise show grouped digits
    if (!n) return n;
    if (n.startsWith("+")) {
      return n;
    }
    const s = n.replace(/[^\d]/g, "");
    if (s.length === 10) {
      return `+1 ${s.slice(0,3)}-${s.slice(3,6)}-${s.slice(6)}`;
    }
    return `+${s}`;
  }

  if (!form || !confirmation || !phoneInput) {
    console.error("Form elements not found: ensure #optin-form, #phone and #confirmation exist in the page.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload

    const raw = phoneInput.value || "";
    const normalized = normalizeNumber(raw);

    if (!normalized) {
      confirmation.textContent = "⚠️ Please enter a phone number.";
      confirmation.style.display = "block";
      confirmation.style.color = "#dc3545";
      return;
    }

    if (!isPlausiblePhone(normalized)) {
      confirmation.textContent = "⚠️ Please enter a valid phone number (include country code or 10-digit US number).";
      confirmation.style.display = "block";
      confirmation.style.color = "#dc3545";
      return;
    }

    const pretty = prettyFormat(normalized);

    // show confirmation
    confirmation.textContent = `✅ Thanks! We'll text you updates at ${pretty}`;
    confirmation.style.display = "block";
    confirmation.style.color = "#28a745";

    // clear the form
    form.reset();

    // TODO: send to backend via fetch() when endpoint available
    // fetch('/subscribe', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({phone: normalized}) })
    //   .then(...)
    //   .catch(...);

  });
});