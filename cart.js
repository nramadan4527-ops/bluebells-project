let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== RENDER CART =====
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

  document.getElementById("subtotal").innerText = total;
  document.getElementById("cartTotal").innerText = total;

  updateCartCount();
}

// ===== CART COUNT =====
function updateCartCount() {
  let totalQty = cart.reduce((s, i) => s + (i.qty || 1), 0);

  let counter = document.getElementById("cart-count");
  if (counter) counter.innerText = totalQty;
}

// ===== CHECKOUT =====
function checkout() {

  if (cart.length === 0) {
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

  let order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  // clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify([]));

  window.location.href = "confirmation.html";
}

// ===== INIT =====
renderCart();
updateCartCount();