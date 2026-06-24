let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== CHECKOUT (FORCE WORK) =====
function checkout() {
  console.log("checkout clicked");

  const name = document.getElementById("c-name-input");
  const phone = document.getElementById("c-phone-input");
  const address = document.getElementById("c-address-input");

  if (!name || !phone || !address) {
    alert("Inputs not found");
    return;
  }

  if (!name.value || !phone.value || !address.value) {
    alert("Fill all fields");
    return;
  }

  const order = {
    id: Date.now(),
    customer: {
      name: name.value,
      phone: phone.value,
      address: address.value
    },
    items: cart,
    total: cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  };

  localStorage.setItem("orderData", JSON.stringify(order));

  // clear cart
  localStorage.setItem("cart", JSON.stringify([]));

  // FORCE REDIRECT (no conditions)
  window.location.assign("confirmation.html");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  if (btn) {
    btn.addEventListener("click", checkout);
  }
});