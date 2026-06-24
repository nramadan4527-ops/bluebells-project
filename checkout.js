let cart = JSON.parse(localStorage.getItem("cart")) || [];

const itemsDiv = document.getElementById("checkout-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const msg = document.getElementById("msg");

function renderCheckout() {
  itemsDiv.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const qty = item.qty || 1;
    const price = Number(item.price) * qty;

    total += price;
    count += qty;

    itemsDiv.innerHTML += `
      <div class="checkout-item">
        <span>${item.name} × ${qty}</span>
        <span>${price} EGP</span>
      </div>
    `;
  });

  totalEl.innerText = total + " EGP";
  cartCount.innerText = count;
}

renderCheckout();

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !address || !phone) {
    msg.innerText = "Please fill all fields";
    return;
  }

  const orderData = {
    id: Date.now(),
    name,
    address,
    phone,
    items: cart,
    total: cart.reduce(
      (sum, item) => sum + Number(item.price) * (item.qty || 1),
      0
    )
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));
  localStorage.removeItem("cart");

  msg.innerText = "Order placed successfully 💙";

  setTimeout(() => {
    window.location.href = "confirmation.html";
  }, 2000);
});