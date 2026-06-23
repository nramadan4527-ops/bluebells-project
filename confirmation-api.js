let orderData = JSON.parse(localStorage.getItem("lastOrder")) || {};

let items = orderData.items || [];
let customer = orderData.customer || {};

const nameEl = document.getElementById("c-name");
const phoneEl = document.getElementById("c-phone");
const addressEl = document.getElementById("c-address");
const totalEl = document.getElementById("c-total");
const productsEl = document.getElementById("c-products");

// ===== Customer =====
nameEl.innerText = customer.name || "-";
phoneEl.innerText = customer.phone || "-";
addressEl.innerText = customer.address || "-";

// ===== Products =====
let total = 0;
productsEl.innerHTML = "";

items.forEach(item => {
  total += Number(item.price);

  productsEl.innerHTML += `
    <li>${item.name} - ${item.price} EGP</li>
  `;
});

totalEl.innerText = total + " EGP";

// ===== Repeat Order =====
document.getElementById("repeatOrderBtn").onclick = function () {
  localStorage.setItem("cart", JSON.stringify(items));
  window.location.href = "cart.html";
};