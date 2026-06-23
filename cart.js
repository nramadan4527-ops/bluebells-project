
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
    const itemPrice = Number(item.price) * (item.qty || 1);
    total += itemPrice;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>${itemPrice} EGP</p>
          <p>Qty: ${item.qty || 1}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  subtotal.innerText = total + " EGP";
  cartTotal.innerText = total + " EGP";

  if (cartCount) {
    const totalQty = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    cartCount.innerText = totalQty;
  }
}

// ===== Remove Item =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== Checkout + SAVE ORDER (FIXED) =====
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const customer = {
    name: document.getElementById("c-name-input").value.trim(),
    phone: document.getElementById("c-phone-input").value.trim(),
    address: document.getElementById("c-address-input").value.trim()
  };

  if (!customer.name || !customer.phone || !customer.address) {
    alert("Please fill all customer info ❌");
    return;
  }

  const total = cart.reduce(
    (sum, i) => sum + Number(i.price) * (i.qty || 1),
    0
  );

  const order = {
    id: Date.now(),
    customer,
    items: cart,
    total
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "confirmation.html";
}

// ===== INIT =====
renderCart();