let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {

    let price = item.price * (item.qty || 1);
    total += price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>${price} EGP</p>
          <p>Qty: ${item.qty || 1}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("subtotal").innerText = total;
  document.getElementById("cartTotal").innerText = total;
  document.getElementById("cart-count").innerText =
    cart.reduce((s, i) => s + (i.qty || 1), 0);
}

function checkout() {

  if (cart.length === 0) {
    alert("Cart empty");
    return;
  }

  const name = document.getElementById("c-name-input").value;
  const phone = document.getElementById("c-phone-input").value;
  const address = document.getElementById("c-address-input").value;

  if (!name || !phone || !address) {
    alert("Fill all data");
    return;
  }

  let order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce((s, i) => s + i.price * (i.qty || 1), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("cart", JSON.stringify([]));

  window.location.href = "confirmation.html";
}

renderCart();