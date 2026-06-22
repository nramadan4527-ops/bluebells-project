// ===== Shopping Cart Management =====
let cart = [];

function initCart() {
  const stored = localStorage.getItem("cart");
  if (stored) {
    try {
      cart = JSON.parse(stored);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }
  
  saveCart();
  alert(`${product.name} added to cart 💙`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateCartQty(id, qty) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
    }
  }
}

function clearCart() {
  cart = [];
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const elements = document.querySelectorAll("#cart-count");
  elements.forEach(el => el.innerText = count);
}

// Initialize cart on page load
window.addEventListener("load", () => {
  initCart();
  updateCartCount();
});
