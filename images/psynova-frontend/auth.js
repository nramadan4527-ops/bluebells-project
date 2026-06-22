function login() {
  alert("Login success (demo)");
  window.location.href = "dashboard.html";
}
function login() {
  const email = document.querySelector("input[type='email']").value;

  if(email){
    localStorage.setItem("user", email);
    window.location.href = "dashboard.html";
  } else {
    alert("Enter email");
  }
}