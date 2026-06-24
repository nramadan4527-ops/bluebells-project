let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cart-count");

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const qty = item.qty || 1;
    const price = Number(item.price) * qty;
    total += price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${price} EGP</p>
          <p>Qty: ${qty}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  subtotal.innerText = total + " EGP";
  cartTotal.innerText = total + " EGP";
  cartCount.innerText = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
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

  const name = document.getElementById("c-name-input").value.trim();
  const phone = document.getElementById("c-phone-input").value.trim();
  const address = document.getElementById("c-address-input").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all customer info");
    return;
  }

  const order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce(
      (sum, item) => sum + Number(item.price) * (item.qty || 1),
      0
    )
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  window.location.href = "confirmation.html";
}

renderCart();