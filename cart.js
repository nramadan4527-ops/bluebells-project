let cart = JSON.parse(localStorage.getItem("cart")) || [];

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
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