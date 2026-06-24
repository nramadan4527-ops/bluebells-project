// ===== Get Cart from localStorage =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== Elements =====
const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");

// ===== Render Cart =====
function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='empty'>Your cart is empty</p>";
    totalPriceSpan.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity || 1);

    total += price * quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${price} EGP</p>
          <span>Qty: ${quantity}</span>
        </div>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  totalPriceSpan.innerText = total.toFixed(2);
}

// ===== Remove Item =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== Checkout =====
function checkout() {
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all customer information");
    return;
  }

  const orderData = {
    name: name,
    phone: phone,
    address: address,
    cart: cart,
    total: Number(totalPriceSpan.innerText)
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  // optional: clear cart after checkout
  // localStorage.removeItem("cart");

  window.location.href = "confirmation.html";
}

// ===== Init =====
renderCart();