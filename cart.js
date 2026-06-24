let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");

/* Render Cart */
function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    totalPriceSpan.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price} EGP</p>
          <p>Qty: ${item.quantity}</p>
        </div>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
  });

  totalPriceSpan.innerText = total;
}

/* Remove Item */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

/* Checkout */
function checkout() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;

  if (!name || !phone || !address) {
    alert("Please fill all customer info");
    return;
  }

  const customerInfo = {
    name,
    phone,
    address,
    cart,
    total: totalPriceSpan.innerText
  };

  localStorage.setItem("orderData", JSON.stringify(customerInfo));

  window.location.href = "confirmation.html";
}

renderCart();