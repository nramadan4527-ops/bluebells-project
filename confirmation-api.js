let order = JSON.parse(localStorage.getItem("lastOrder")) || [];

// ===== Elements =====
const nameEl = document.getElementById("c-name");
const phoneEl = document.getElementById("c-phone");
const addressEl = document.getElementById("c-address");
const totalEl = document.getElementById("c-total");
const productsEl = document.getElementById("c-products");

// ===== Fake customer data =====
nameEl.innerText = "Bluebells Customer";
phoneEl.innerText = "0123456789";
addressEl.innerText = "Cairo, Egypt";

// ===== Render Order =====
let total = 0;

productsEl.innerHTML = "";

order.forEach(item => {
  total += Number(item.price);

  productsEl.innerHTML += `
    <li>${item.name} - ${item.price} EGP</li>
  `;
});

totalEl.innerText = total + " EGP";

// ===== Repeat Order =====
document.getElementById("repeatOrderBtn").onclick = function () {
  localStorage.setItem("cart", JSON.stringify(order));
  window.location.href = "cart.html";
};