document.getElementById("doctorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;

  if (password1 !== password2) {
    alert("Passwords do not match!");
    return;
  }

  if (!password1 || password1.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  const doctorData = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
    specialty: document.getElementById("specialty").value,
    experience: document.getElementById("experience").value,
    price: document.getElementById("price").value,
    bio: document.getElementById("bio").value
  };

  localStorage.setItem("doctor", JSON.stringify(doctorData));
  alert("Doctor Account Created Successfully!");
  window.location.href = "home.html";
});