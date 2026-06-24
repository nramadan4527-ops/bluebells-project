let products = JSON.parse(localStorage.getItem("products")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

const productsDiv = document.getElementById("products");
const ordersDiv = document.getElementById("orders");

function addProduct() {
  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const image = document.getElementById("image").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    image
  });

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  productsDiv.innerHTML = "";
  products.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>${p.price} EGP</p>
      </div>
    `;
  });
}

function renderOrders() {
  ordersDiv.innerHTML = "";
  orders.forEach(o => {
    ordersDiv.innerHTML += `
      <div class="order">
        <h4>${o.name} - ${o.phone}</h4>
        <p>Total: ${o.total} EGP</p>
      </div>
    `;
  });
}

renderProducts();
renderOrders();