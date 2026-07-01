const adminOrders = document.getElementById("adminOrders");
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

const adminProducts = document.getElementById("adminProducts");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

function normalizeOrder(order) {
  const customer = order.customer || {};
  const items = Array.isArray(order.items) ? order.items : Array.isArray(order.cart) ? order.cart : [];

  return {
    ...order,
    customer,
    name: customer.name || order.name || "Unknown customer",
    phone: customer.phone || order.phone || "N/A",
    address: customer.address || order.address || "N/A",
    items,
    cart: items,
    total: order.total || order.amount || 0,
    status: order.status || "Confirmed"
  };
}

function getConfirmedOrders() {
  return orders
    .map(normalizeOrder)
    .filter((order) => {
      const status = (order.status || "").toString().trim().toLowerCase();
      return !status || ["confirmed", "processing", "shipped", "delivered", "paid"].includes(status);
    });
}

/* Preview */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

/* Add Product */
function addProduct(){
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);

  if(!name || !price || !preview.src){
    alert("Fill all fields");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    image: preview.src
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  imageInput.value = "";
  preview.style.display = "none";
}

/* Render Products */
function renderProducts(){
  adminProducts.innerHTML = "";

  products.forEach(p=>{
    adminProducts.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>${p.price} EGP</p>

        <button class="delete-btn" onclick="deleteProduct(${p.id})">
          Delete
        </button>
      </div>
    `;
  });
}

/* Delete */
function deleteProduct(id){
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

renderProducts();
function renderOrders(){
  adminOrders.innerHTML = "";

  const confirmedOrders = getConfirmedOrders();

  if(confirmedOrders.length === 0){
    adminOrders.innerHTML = "<p>No confirmed orders yet</p>";
    return;
  }

  confirmedOrders.forEach(o=>{
    const itemsMarkup = (o.items || []).map(item => {
      const itemName = item.name || item.productName || "Item";
      const itemQty = item.qty || item.quantity || 1;
      const itemPrice = item.price || 0;
      return `<li>${itemName} × ${itemQty} — ${itemPrice} EGP</li>`;
    }).join("");

    adminOrders.innerHTML += `
      <div class="order-card">
        <div class="order-head">
          <h4>Order #${o.id}</h4>
          <span class="status-badge">${o.status}</span>
        </div>
        <p>👤 ${o.name}</p>
        <p>📞 ${o.phone}</p>
        <p>📍 ${o.address}</p>
        <p><strong>Total:</strong> ${o.total} EGP</p>

        <ul>
          ${itemsMarkup || "<li>No items</li>"}
        </ul>
      </div>
    `;
  });
}

renderOrders();