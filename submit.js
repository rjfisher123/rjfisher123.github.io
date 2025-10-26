document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("optin-form");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // ✅ Stop page reload

    const phone = document.getElementById("phone").value.trim();

    if (phone) {
      // Replace with actual submission logic or API call here later
      confirmation.textContent = `Thanks! We'll text you updates at ${phone}.`;
      confirmation.style.display = "block";
      confirmation.style.color = "#28a745"; // Optional: green
      form.reset(); // Clear the input
    } else {
      confirmation.textContent = "Please enter a valid phone number.";
      confirmation.style.display = "block";
      confirmation.style.color = "#dc3545"; // Optional: red
    }
  });
});