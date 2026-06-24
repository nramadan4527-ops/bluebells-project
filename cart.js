let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach((item) => {
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>${item.price} EGP</p>
        </div>
      </div>
    `;
  });
}

renderCart();