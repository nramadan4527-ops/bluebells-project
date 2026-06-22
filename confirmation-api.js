/* ===== Load and Display Order Confirmation ===== */

async function loadConfirmation() {
  let orderData = JSON.parse(localStorage.getItem("orderData"));

  // If no order data, create demo order
  if (!orderData) {
    orderData = {
      name: "Guest Customer",
      phone: "0123456789",
      address: "Cairo, Egypt",
      items: [{name: "Sample Product", price: 100, qty: 1}],
      total: 100
    };
  }

  // Fill in customer info
  document.getElementById("c-name").textContent = orderData.name;
  document.getElementById("c-phone").textContent = orderData.phone;
  document.getElementById("c-address").textContent = orderData.address;

  // Fill in products
  const productsList = document.getElementById("c-products");
  productsList.innerHTML = "";

  let total = 0;
  orderData.items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} × ${item.qty || 1}`;
    productsList.appendChild(li);
    total += item.price * (item.qty || 1);
  });

  // Fill in total
  document.getElementById("c-total").textContent = `$${(total || orderData.total).toFixed(2)}`;

  // Generate order ID and delivery date
  const generateOrderID = () => "BLB-" + Math.floor(100000 + Math.random() * 900000);
  
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toDateString();
  };

  const orderIdEl = document.querySelector(".order-id span");
  if (orderIdEl) {
    orderIdEl.textContent = generateOrderID();
  }

  const noteEl = document.querySelector(".note");
  if (noteEl) {
    noteEl.textContent = `Estimated delivery: ${getDeliveryDate()}`;
  }

  // Confetti animation
  confetti();

  // Add Repeat Order button handler: restore items into cart and go to checkout
  const repeatBtn = document.getElementById("repeatOrderBtn");
  if (repeatBtn) {
    repeatBtn.addEventListener("click", (e) => {
      e.preventDefault();
      try {
        const savedItems = (orderData.items || []).map(it => ({
          name: it.name,
          price: typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0,
          qty: it.qty || 1,
          image: it.image || ""
        }));

        localStorage.setItem("cart", JSON.stringify(savedItems));
        // Keep orderData so user can come back; redirect to checkout to edit or pay
        window.location.href = "checkout.html";
      } catch (err) {
        console.error('Repeat order failed', err);
        alert('Could not repeat order.');
      }
    });
  }
}

/* ===== Confetti Effect ===== */
function confetti() {
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.style.position = "fixed";
    span.style.top = "-10px";
    span.style.left = Math.random() * 100 + "vw";
    span.style.width = "8px";
    span.style.height = "8px";
    span.style.background = ["#22c55e", "#0f2a44", "#60a5fa"][Math.floor(Math.random() * 3)];
    span.style.borderRadius = "50%";
    span.style.opacity = 0.8;
    span.style.pointerEvents = "none";
    span.style.animation = `fall ${2 + Math.random() * 3}s linear`;
    document.body.appendChild(span);

    setTimeout(() => span.remove(), 5000);
  }
}

/* ===== Confetti Animation CSS ===== */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(110vh);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

/* ===== Load on Page Load ===== */
window.addEventListener("load", loadConfirmation);
