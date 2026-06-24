let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.innerHTML = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price); // 👈 مهم
    total += price;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>${price} EGP</p>
          <button onclick="removeFromCart(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  cartTotal.innerHTML = `<h3>Total: ${total} EGP</h3>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  // خزّني بيانات الأوردر
  const orderData = {
    items: cart,
    total: cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0)
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  // روحي على صفحة التأكيد
  window.location.href = "confirmation.html";
}
function saveCustomerInfo() {
  const customer = {
    name: document.getElementById("custName").value,
    email: document.getElementById("custEmail").value,
    phone: document.getElementById("custPhone").value,
    address: document.getElementById("custAddress").value
  };

  localStorage.setItem("customerInfo", JSON.stringify(customer));
}