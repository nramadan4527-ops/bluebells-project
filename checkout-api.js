/* ===== Initialize Cart Manager ===== */
initCart();

/* ===== Render Checkout ===== */
async function renderCheckout() {
  const itemsDiv = document.getElementById("checkout-items");
  const totalEl = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  itemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    itemsDiv.innerHTML += `
      <div class="checkout-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${item.price * item.qty} EGP</span>
      </div>
    `;
  });

  totalEl.innerText = total + " EGP";
  cartCount.innerText = count;
}

renderCheckout();

/* ===== Submit Order to Backend ===== */
document.getElementById("checkoutForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg");

  if (!name || !address || !phone) {
    alert("Please fill in all fields");
    return;
  }

  try {
    const orderData = {
      customer: {
        name: name,
        address: address,
        phone: phone
      },
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0)
    };

    msg.innerText = "Creating order... 💙";

    const response = await OrderAPI.create(orderData);

    if (response.error) {
      throw new Error(response.error);
    }

    // Save order data for confirmation page
    localStorage.setItem("orderData", JSON.stringify(orderData));
    msg.innerText = "Order placed successfully 💙";

    // Clear cart
    clearCart();

    // Redirect to confirmation
    setTimeout(() => {
      window.location.href = "confirmation.html";
    }, 2000);

  } catch (err) {
    console.error("Order error:", err);
    msg.innerText = "Error creating order: " + err.message;
    msg.style.color = "#ef4444";
  }
});
