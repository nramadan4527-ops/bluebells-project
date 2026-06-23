let orders = JSON.parse(localStorage.getItem("orders")) || [];
let lastOrder = orders[orders.length - 1] || {};

document.getElementById("c-name").innerText = lastOrder.customer?.name || "";
document.getElementById("c-phone").innerText = lastOrder.customer?.phone || "";
document.getElementById("c-address").innerText = lastOrder.customer?.address || "";
document.getElementById("c-total").innerText = lastOrder.total || 0;

const list = document.getElementById("c-products");

(lastOrder.items || []).forEach(item => {
  list.innerHTML += `<li>${item.name} - ${item.price} EGP</li>`;
});