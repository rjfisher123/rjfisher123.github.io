document.getElementById('optin-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from submitting normally
  const phone = document.getElementById('phone').value;
  alert(`Thanks! We'll text you at: ${phone}`);
  // Future: Send to backend API or service
});
