let orders = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("ordersList");

// ===== Render Orders =====
function renderOrders() {
  container.innerHTML = "";

  if (!orders || orders.length === 0) {
    container.innerHTML = "<p style='color:#94a3b8'>No orders yet 😢</p>";
    return;
  }

  orders.forEach((order, i) => {
    container.innerHTML += `
      <div class="order-card">

        <h3>🧾 Order #${order.id}</h3>

        <div class="order-customer">
          <p>👤 ${order.customer?.name || "-"}</p>
          <p>📞 ${order.customer?.phone || "-"}</p>
          <p>📍 ${order.customer?.address || "-"}</p>
        </div>

        <h4>🛍 Items:</h4>

        <div class="order-items">
          ${(order.items || []).map(p => `
            <p>${p.name} - ${p.price} EGP</p>
          `).join("")}
        </div>

        <h4>💰 Total: ${order.total || 0} EGP</h4>

        <button class="delete-btn" onclick="deleteOrder(${i})">
          Delete
        </button>

      </div>
    `;
  });
}

// ===== Delete Order =====
function deleteOrder(i) {
  if (!confirm("Delete this order?")) return;

  orders.splice(i, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// ===== Init =====
renderOrders();