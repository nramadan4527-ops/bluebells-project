let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.innerHTML = "";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += Number(item.price);

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

  cartTotal.innerHTML = `<h3>Total: ${total} EGP</h3>`;
}

renderCart();