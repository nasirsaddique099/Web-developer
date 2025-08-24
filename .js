// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const formTabs = document.querySelectorAll('.form-tab');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    formTabs.forEach(tab => tab.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Show/hide password
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});

// Password strength check
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  const strength = document.getElementById("passwordStrength");
  if (val.length < 6) {
    strength.textContent = "Weak";
    strength.style.color = "red";
  } else if (val.match(/[0-9]/) && val.match(/[A-Z]/)) {
    strength.textContent = "Strong";
    strength.style.color = "green";
  } else {
    strength.textContent = "Medium";
    strength.style.color = "orange";
  }
});

// OTP simulation
document.getElementById("sendOTP").addEventListener("click", () => {
  const phone = document.getElementById("phoneInput").value;
  const msg = document.getElementById("otpMessage");

  if (phone.length < 10) {
    msg.textContent = "Please enter a valid phone number.";
    msg.style.color = "red";
  } else {
    msg.textContent = "OTP sent! (Simulated)";
    msg.style.color = "green";
  }
});
