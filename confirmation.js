// Get order data from localStorage
const order = JSON.parse(localStorage.getItem("orderData"));

// Elements
const nameEl = document.getElementById("conf-name");
const addressEl = document.getElementById("conf-address");
const phoneEl = document.getElementById("conf-phone");
const totalEl = document.getElementById("conf-total");
const itemsEl = document.getElementById("conf-items");

if (!order) {
  // لو مفيش أوردر
  itemsEl.innerHTML = "<li>No order found</li>";
} else {
  // Customer info
  nameEl.innerText = order.name;
  addressEl.innerText = order.address;
  phoneEl.innerText = order.phone;
  totalEl.innerText = order.total + " EGP";

  // Order items
  let list = "";
  order.items.forEach(item => {
    const qty = item.qty || 1;
    list += `<li>${item.name} × ${qty}</li>`;
  });

  itemsEl.innerHTML = list;
}