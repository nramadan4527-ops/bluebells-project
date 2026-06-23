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
    total += Number(item.price);

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} EGP</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  subtotal.innerText = total + " EGP";
  cartTotal.innerText = total + " EGP";
  cartCount.innerText = cart.length;
}

// ===== Remove =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== Checkout + SAVE ORDER =====
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const customer = {
    name: document.getElementById("c-name-input").value,
    phone: document.getElementById("c-phone-input").value,
    address: document.getElementById("c-address-input").value
  };

  if (!customer.name || !customer.phone || !customer.address) {
    alert("Please fill all customer info ❌");
    return;
  }

  const order = {
    id: Date.now(),
    customer,
    items: cart,
    total: cart.reduce((sum, i) => sum + Number(i.price), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "confirmation.html";
}

// ===== Init =====
renderCart();