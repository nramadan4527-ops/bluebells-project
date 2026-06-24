const order = JSON.parse(localStorage.getItem("orderData"));

if (order) {
  document.getElementById("c-name").innerText = order.name;
  document.getElementById("c-phone").innerText = order.phone;
  document.getElementById("c-address").innerText = order.address;
  document.getElementById("c-total").innerText = order.total;

  const productsUl = document.getElementById("c-products");

  order.cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} x${item.quantity} - ${item.price} EGP`;
    productsUl.appendChild(li);
  });
}