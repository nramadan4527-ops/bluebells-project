const order = JSON.parse(localStorage.getItem("orderData"));

const nameEl = document.getElementById("c-name");
const phoneEl = document.getElementById("c-phone");
const addressEl = document.getElementById("c-address");
const totalEl = document.getElementById("c-total");
const itemsEl = document.getElementById("c-products");

if (!order) {
  itemsEl.innerHTML = "<li>No order found</li>";
} else {
  nameEl.innerText = order.customer.name;
  phoneEl.innerText = order.customer.phone;
  addressEl.innerText = order.customer.address;
  totalEl.innerText = order.total + " EGP";

  itemsEl.innerHTML = "";

  order.items.forEach(item => {
    itemsEl.innerHTML += `
      <li>${item.name} × ${item.qty || 1}</li>
    `;
  });
}
const order = JSON.parse(localStorage.getItem("orderData"));

if (!order) {
  document.body.innerHTML = "<h2>No order found</h2>";
} else {
  document.getElementById("cartTotal").innerText =
    order.total + " EGP";
}