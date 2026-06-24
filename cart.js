let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById("cartItems");
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

  document.getElementById("subtotal").innerText = total;
  document.getElementById("cartTotal").innerText = total;

  updateCartCount();
}

// ===== CART COUNT =====
function updateCartCount() {
  let totalQty = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.getElementById("cart-count").innerText = totalQty;
}

// ===== CHECKOUT (FIXED FINAL VERSION) =====
window.checkout = function () {

  if (!cart || cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const name = document.getElementById("c-name-input").value;
  const phone = document.getElementById("c-phone-input").value;
  const address = document.getElementById("c-address-input").value;

  if (!name || !phone || !address) {
    alert("Fill all fields ❌");
    return;
  }

  const order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  };

  localStorage.setItem("orderData", JSON.stringify(order));

  cart = [];
  localStorage.setItem("cart", JSON.stringify([]));

  window.location.href = "confirmation.html";
};

// INIT
renderCart();
updateCartCount();