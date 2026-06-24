function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const name = document.getElementById("c-name-input").value;
  const phone = document.getElementById("c-phone-input").value;
  const address = document.getElementById("c-address-input").value;

  if (!name || !phone || !address) {
    alert("Please fill all info ❌");
    return;
  }

  const order = {
    id: Date.now(),
    customer: { name, phone, address },
    items: cart,
    total: cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0)
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  // clear cart AFTER saving order
  localStorage.setItem("cart", JSON.stringify([]));

  alert("Order placed successfully 💙");

  window.location.href = "confirmation.html";
}