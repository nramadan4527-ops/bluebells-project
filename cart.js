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

// ===== Remove Item =====
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ===== Checkout =====
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty 🛒");
    return;
  }

  // save order
  localStorage.setItem("lastOrder", JSON.stringify(cart));

  // clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // go to confirmation
  window.location.href = "confirmation.html";
}

// ===== Init =====
renderCart();