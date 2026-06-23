document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const passwordValue = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error");
  const btn = this.querySelector("button");

  errorMsg.innerText = "";

  if (!username || !passwordValue) {
    errorMsg.innerText = "Please enter username and password ❌";
    return;
  }

  btn.disabled = true;
  btn.innerText = "Logging in...";

  try {
    const result = await Auth.login(username, passwordValue);

    if (!result.success) {
      throw new Error(result.error || "Login failed");
    }

    window.location.href = "admin.html";
  } catch (err) {
    console.error(err);
    errorMsg.innerText = err.message || "Login failed ❌";
  } finally {
    btn.disabled = false;
    btn.innerText = "Login";
  }
});