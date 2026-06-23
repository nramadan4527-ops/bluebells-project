
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cart-count");

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

  if (subtotal) subtotal.innerText = total + " EGP";
  if (cartTotal) cartTotal.innerText = total + " EGP";

  if (cartCount) {
    cartCount.innerText = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  }

  // debug (safe)
  const debug = document.getElementById("debug-cart");
  if (debug) {
    debug.innerText = JSON.stringify(cart, null, 2);
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const customer = {
    name: document.getElementById("c-name-input").value,
    phone: document.getElementById("c-phone-input").value,
    address: document.getElementById("c-address-input").value
  };

  const order = {
    id: Date.now(),
    customer,
    items: cart,
    total: cart.reduce((sum, i) => sum + Number(i.price) * (i.qty || 1), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  window.location.href = "confirmation.html";
}

renderCart();