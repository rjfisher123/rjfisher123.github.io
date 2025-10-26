document.getElementById('optin-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const phone = document.getElementById('phone').value;

  const confirmation = document.createElement('p');
  confirmation.textContent = `✅ Thanks! We'll text you at: ${phone}`;
  confirmation.style.color = 'green';

  const form = document.getElementById('optin-form');
  form.parentNode.insertBefore(confirmation, form.nextSibling);

  form.reset(); // Optional: clears the input field
});
