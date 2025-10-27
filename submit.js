document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optin-form");
  const confirmation = document.getElementById("confirmation");
  const phoneInput = document.getElementById("phone");

  function normalizeNumber(input) {
    return input.replace(/[^\d]/g, "");
  }

  function isPlausiblePhone(n) {
    // Accepts numbers with 10 to 15 digits starting with a non-zero digit
    return /^[1-9]\d{9,14}$/.test(n);
  }

  function prettyFormat(n) {
    if (n.length === 10) {
      return `+1 ${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
    }
    return `+${n}`;
  }

  if (!form || !confirmation || !phoneInput) {
    console.error("Form elements not found: ensure #optin-form, #phone and #confirmation exist in the page.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload

    const raw = phoneInput.value || "";
    const normalized = normalizeNumber(raw); // only digits now
    console.log("Normalized:", normalized);

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

    fetch("https://fuggerbot-alerts-server.fly.dev/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ phone: normalized })
    })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    })
    .then(data => {
      console.log("✅ Successfully subscribed:", data);
    })
    .catch(error => {
      console.error("❌ Failed to subscribe:", error);
      confirmation.textContent = "⚠️ Something went wrong. Please try again later.";
      confirmation.style.display = "block";
      confirmation.style.color = "#dc3545";
    });

  });
});