document.addEventListener("DOMContentLoaded", function() {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("click", submitForm);
  }
});

function submitForm() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const concern = document.getElementById("concern").value;
  const description = document.getElementById("description").value;
  const docGender = document.querySelector('input[name="docGender"]:checked')?.value;

  if (!fullName || !email || !phone) {
    alert("Please fill all required fields!");
    return;
  }

  const patientData = {
    fullName: fullName,
    email: email,
    phone: phone,
    dob: dob,
    gender: gender,
    concern: concern,
    description: description,
    preferredDoctorGender: docGender
  };

  localStorage.setItem("patient", JSON.stringify(patientData));
  alert("Registered successfully!");
  window.location.href = "home.html";
}