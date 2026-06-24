let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= RENDER CART =================
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    let itemTotal = item.price * (item.qty || 1);
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="70">

        <div>
          <h3>${item.name}</h3>
          <p>${item.price} EGP</p>
          <p>Qty: ${item.qty || 1}</p>
        </div>
      </div>
    `;
  });

  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cart-count");

  if (subtotalEl) subtotalEl.innerText = total;
  if (totalEl) totalEl.innerText = total;

  if (countEl) {
    countEl.innerText = cart.reduce((s, i) => s + (i.qty || 1), 0);
  }
}

// ================= CHECKOUT (FINAL FIX) =================
window.checkout = function () {

  if (!cart || cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const name = document.getElementById("c-name-input")?.value;
  const phone = document.getElementById("c-phone-input")?.value;
  const address = document.getElementById("c-address-input")?.value;

  if (!name || !phone || !address) {
    alert("Please fill all fields ❌");
    return;
  }

  const order = {
    id: Date.now(),
    customer: {
      name: name,
      phone: phone,
      address: address
    },
    items: cart,
    total: cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  };

  // save order
  localStorage.setItem("orderData", JSON.stringify(order));

  // clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify([]));

  // redirect (IMPORTANT)
  window.location.href = "confirmation.html";
};

// ================= INIT =================
renderCart();