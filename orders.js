// Get orders from localStorage or create from orderData
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const orderData = JSON.parse(localStorage.getItem("orderData"));

// Add current order to orders list if it exists and is new
if (orderData && orders.length === 0) {
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));
}

const container = document.getElementById("ordersList");

function showOrders() {
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet ❌</p>";
    return;
  }

  orders.forEach((order, index) => {
    let productsHTML = "";

    const items = order.items || [];
    items.forEach(p => {
      productsHTML += `<li>${p.name} × ${p.qty || 1} - ${p.price * (p.qty || 1)} EGP</li>`;
    });

    container.innerHTML += `
      <div class="order-card">
        <h3>Order #${index + 1}</h3>

        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Address:</strong> ${order.address}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>

        <p><strong>Products:</strong></p>
        <ul class="product-list">
          ${productsHTML}
        </ul>

        <p><strong>Total:</strong> ${order.total} EGP</p>
      </div>
    `;
  });
}

showOrders();