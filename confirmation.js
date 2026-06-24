const order = JSON.parse(localStorage.getItem("orderData"));

if (!order) {
  alert("No order found");
} else {
  document.getElementById("c-name").innerText = order.name;
  document.getElementById("c-phone").innerText = order.phone;
  document.getElementById("c-address").innerText = order.address;

  // ✅ total رقم حقيقي
  document.getElementById("c-total").innerText = order.total.toFixed(2);

  const productsUl = document.getElementById("c-products");
  productsUl.innerHTML = "";

  order.cart.forEach(item => {
    const price = Number(item.price);
    const qty = Number(item.quantity || 1);

    const li = document.createElement("li");
    li.innerText = `${item.name} × ${qty} — ${(price * qty).toFixed(2)} EGP`;
    productsUl.appendChild(li);
  });
}