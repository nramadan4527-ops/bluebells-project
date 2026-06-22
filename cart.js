let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartItemsDiv = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const subtotal = document.getElementById("subtotal");
const cartCount = document.getElementById("cart-count");

// Render Cart
function renderCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartTotal.innerText = "0 EGP";
    subtotal.innerText = "0 EGP";
    cartCount.innerText = "0";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.desc || ""}</p>
          <span>${item.price} EGP</span>
        </div>

        <div class="item-actions">
          <div class="qty">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">
            Remove
          </button>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = total + " EGP";
  subtotal.innerText = total + " EGP";
  cartCount.innerText = count;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Change Quantity
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

// Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Initial Render
renderCart();