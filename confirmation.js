let orderData = JSON.parse(localStorage.getItem("orderData"));

if (!orderData) {
  document.body.innerHTML = "<h2>No order found</h2>";
} else {
  document.getElementById("c-name").innerText = orderData.name;
  document.getElementById("c-phone").innerText = orderData.phone;
  document.getElementById("c-address").innerText = orderData.address;
  document.getElementById("c-total").innerText = orderData.total + " EGP";

  const list = document.getElementById("c-products");
  orderData.cart.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} x ${p.qty}`;
    list.appendChild(li);
  });

  /* 👇 احفظ الطلب في orders */
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    id: Date.now(),
    ...orderData
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("orderData");
}