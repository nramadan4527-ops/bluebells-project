// ===== Login Page Script =====

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const passwordValue = document.getElementById("password").value.trim();

  const errorMsg = document.getElementById("error");
  const successMsg = document.getElementById("success");
  const btn = this.querySelector("button");

  // reset messages
  errorMsg.innerText = "";
  successMsg.innerText = "";

  // validation
  if (!username || !passwordValue) {
    errorMsg.innerText = "Please enter username and password ❌";
    return;
  }

  // loading state
  btn.classList.add("loading");
  btn.innerText = "Logging in...";

  try {
    // call auth manager
    const result = await Auth.login(username, passwordValue);

    console.log("LOGIN RESULT:", result);

    // check result
    if (!result.success) {
      throw new Error(result.error);
    }

    // success message
    successMsg.innerText = "Login successful! Redirecting... ✅";

    // redirect
    setTimeout(() => {
      window.location.replace("admin.html");
    }, 700);

  } catch (err) {
    console.error(err);
    errorMsg.innerText = err.message || "Login failed ❌";
  } finally {
    btn.classList.remove("loading");
    btn.innerText = "Login";
  }
});


// ===== Password Toggle =====
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (toggle && password) {
  toggle.addEventListener("click", () => {
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    toggle.classList.toggle("fa-eye-slash");
  });
}