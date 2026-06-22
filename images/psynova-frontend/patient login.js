function login() {
  alert("Login successful!");
}

function googleLogin() {
  alert("Login with Google");
}

function togglePassword() {
  let input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}