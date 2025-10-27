document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscribe-form");
  const phoneInput = document.getElementById("phone");
  const confirmation = document.getElementById("confirmation");

  if (!form || !phoneInput || !confirmation) {
    console.error("Form elements not found: ensure #subscribe-form, #phone and #confirmation exist in the page.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const normalized = phoneInput.value.trim().replace(/\D/g, "");
    if (!normalized || normalized.length < 10) {
      confirmation.textContent = "⚠️ Please enter a valid phone number.";
      confirmation.style.color = "#dc3545";
      confirmation.style.display = "block";
      return;
    }

    confirmation.textContent = "";
    confirmation.style.display = "none";

    fetch("https://fuggerbot-alerts-server.fly.dev/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: normalized })
    })
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
      })
      .then(data => {
        confirmation.textContent = "✅ Subscribed successfully!";
        confirmation.style.color = "#28a745";
        confirmation.style.display = "block";
        phoneInput.value = "";
      })
      .catch(error => {
        console.error("❌ Failed to subscribe:", error);
        confirmation.textContent = "⚠️ Something went wrong. Please try again later.";
        confirmation.style.color = "#dc3545";
        confirmation.style.display = "block";
      });
  });
});