/* =========================
   Helpers
========================= */
function generateOrderID() {
  return "BLB-" + Math.floor(100000 + Math.random() * 900000);
}

function getDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toDateString();
}

/* =========================
   Elements
========================= */
const nameEl = document.getElementById("c-name");
const phoneEl = document.getElementById("c-phone");
const addressEl = document.getElementById("c-address");
const totalEl = document.getElementById("c-total");
const productsList = document.getElementById("c-products");

const orderIdEl = document.querySelector(".order-id span");
const noteEl = document.querySelector(".note");

/* =========================
   Get Order Data
========================= */
const orderData = JSON.parse(localStorage.getItem("orderData"));

if (!orderData) {
  const demoOrder = {
    name: "Guest Customer",
    phone: "0123456789",
    address: "Cairo, Egypt",
    items: [{name: "Sample Product", price: 100, quantity: 1}],
    total: 100
  };
  localStorage.setItem("orderData", JSON.stringify(demoOrder));
}

/* =========================
   Fill Customer Info
========================= */
nameEl.textContent = orderData.name;
phoneEl.textContent = orderData.phone;
addressEl.textContent = orderData.address;

/* =========================
   Products & Total
========================= */
let total = 0;
productsList.innerHTML = "";

orderData.items.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} × ${item.quantity}`;
  productsList.appendChild(li);

  total += item.price * item.quantity;
});

totalEl.textContent = `$${total.toFixed(2)}`;

/* =========================
   Order ID & Delivery
========================= */
if (orderIdEl) {
  orderIdEl.textContent = generateOrderID();
}

if (noteEl) {
  noteEl.textContent = `Estimated delivery: ${getDeliveryDate()}`;
}

/* =========================
   Order Tracking Animation
========================= */
const steps = document.querySelectorAll(".step");
let currentStep = 0;

setInterval(() => {
  if (currentStep < steps.length) {
    steps[currentStep].classList.add("active");
    currentStep++;
  }
}, 1200);

/* =========================
   Confetti Effect (FIXED)
========================= */
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

    /* 🔑 IMPORTANT FIX */
    span.style.pointerEvents = "none";

    span.style.animation = `fall ${2 + Math.random() * 3}s linear`;
    document.body.appendChild(span);

    setTimeout(() => span.remove(), 5000);
  }
}

confetti();

/* =========================
   Clear Cart
========================= */
localStorage.removeItem("cart");

/* =========================
   Confetti Animation CSS
========================= */
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