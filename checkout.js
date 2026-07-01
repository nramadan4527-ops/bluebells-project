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
    customer: {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value
    },
    items: cart,
    total: cart.reduce((sum, p) => sum + Number(p.price), 0),
    date: new Date().toLocaleString(),
    status: "Confirmed"
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // تفريغ الكارت
  localStorage.removeItem("cart");

  window.location.href = "confirmation.html";
});