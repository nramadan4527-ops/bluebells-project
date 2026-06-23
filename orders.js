let orders = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("ordersList");

function renderOrders() {
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet 😢</p>";
    return;
  }

  orders.forEach((order, i) => {
    container.innerHTML += `
      <div class="order-card">

        <h3>Order #${order.id}</h3>

        <p>👤 ${order.customer.name}</p>
        <p>📞 ${order.customer.phone}</p>
        <p>📍 ${order.customer.address}</p>

        <h4>Items:</h4>
        ${order.items.map(p => `<p>${p.name} - ${p.price}</p>`).join("")}

        <h4>Total: ${order.total} EGP</h4>

        <button onclick="deleteOrder(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteOrder(i) {
  orders.splice(i, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

renderOrders();