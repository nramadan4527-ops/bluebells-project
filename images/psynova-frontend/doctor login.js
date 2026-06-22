function togglePassword() {
  let pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}

document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Login Successful!");
});