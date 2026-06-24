let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const order = {
    id: Date.now(),
    customer: document.getElementById("name").value,
    address: document.getElementById("address").value,
    phone: document.getElementById("phone").value,
    products: cart,
    date: new Date().toLocaleString(),
    status: "Pending"
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("Order Confirmed ✅");
  window.location.href = "index.html";
});