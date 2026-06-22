let cart = JSON.parse(localStorage.getItem("cart")) || [];

const itemsDiv = document.getElementById("checkout-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const msg = document.getElementById("msg");

// Render checkout
function renderCheckout() {
  itemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    itemsDiv.innerHTML += `
      <div class="checkout-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${item.price * item.qty} EGP</span>
      </div>
    `;
  });

  totalEl.innerText = total + " EGP";
  cartCount.innerText = count;
}

renderCheckout();

// Submit Order
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  const orderData = {
    name: name,
    address: address,
    phone: phone,
    items: cart,
    total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));
  msg.innerText = "Order placed successfully 💙";

  localStorage.removeItem("cart");

  setTimeout(() => {
    window.location.href = "confirmation.html";
  }, 2000);
});