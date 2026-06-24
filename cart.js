let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById("cartItems");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    total += item.price * (item.qty || 1);

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

// ===== CHECKOUT =====
window.checkout = function () {

  const name = document.getElementById("c-name-input")?.value;
  const phone = document.getElementById("c-phone-input")?.value;
  const address = document.getElementById("c-address-input")?.value;

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

// ===== INIT =====
renderCart();