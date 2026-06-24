let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cart-count");

// ===== Render Cart =====
function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    let price = Number(item.price) * (item.qty || 1);
    total += price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>${price} EGP</p>
          <p>Qty: ${item.qty || 1}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  subtotal.innerText = total + " EGP";
  cartTotal.innerText = total + " EGP";

  if (cartCount) {
    cartCount.innerText = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  }
}

// ===== Remove Item =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== CHECKOUT (FIXED 100%) =====
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const name = document.getElementById("c-name-input").value;
  const phone = document.getElementById("c-phone-input").value;
  const address = document.getElementById("c-address-input").value;

  if (!name || !phone || !address) {
    alert("Please fill all info ❌");
    return;
  }

  const order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  // clear cart AFTER saving
  localStorage.setItem("cart", JSON.stringify([]));

  // redirect
  window.location.href = "confirmation.html";
}

// ===== INIT =====
renderCart();