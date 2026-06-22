document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("error").innerText = "Please enter username and password ❌";
  }
});