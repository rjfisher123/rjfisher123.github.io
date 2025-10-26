document.getElementById('optin-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const phone = document.getElementById('phone').value;
  const confirmation = document.getElementById('confirmation');

  if (phone.trim()) {
    confirmation.textContent = `✅ Thanks! We'll text you at: ${phone}`;
    confirmation.style.display = 'block';
    confirmation.style.color = 'green';
  } else {
    confirmation.textContent = '⚠️ Please enter a valid phone number.';
    confirmation.style.display = 'block';
    confirmation.style.color = 'red';
  }
});
