let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} EGP</p>
          <p>Qty: ${item.qty}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("subtotal").innerText = total + " EGP";
  document.getElementById("cartTotal").innerText = total + " EGP";
}

// ===== CART COUNT =====
function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.innerText = count;
}

// ===== INIT =====
renderCart();
updateCartCount();