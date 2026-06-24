let orders = JSON.parse(localStorage.getItem("orders")) || [];
const ordersList = document.getElementById("ordersList");

function renderOrders() {
  ordersList.innerHTML = "";

  if (orders.length === 0) {
    ordersList.innerHTML = "<p class='empty'>No orders yet</p>";
    return;
  }

  orders.forEach((order, index) => {
    ordersList.innerHTML += `
      <div class="order-card">

        <div class="order-head">
          <h3>Order #${order.id}</h3>
          <span>${order.date}</span>
        </div>

        <div class="customer">
          <p><strong>Name:</strong> ${order.customer.name}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
          <p><strong>Address:</strong> ${order.customer.address}</p>
        </div>

        <div class="items">
          ${order.items.map(item => `
            <div class="item">
              <span>${item.name}</span>
              <span>${item.price} EGP</span>
            </div>
          `).join("")}
        </div>

        <div class="total">
          Total: ${order.total} EGP
        </div>

        <button class="delete" onclick="deleteOrder(${index})">
          Delete Order
        </button>

      </div>
    `;
  });
}

function deleteOrder(index) {
  if (!confirm("Delete this order?")) return;

  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

renderOrders();