// ===== Shopping Cart Management =====
let cart = [];

// Load cart from localStorage
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

// Save cart + update count
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart
function addToCart(product) {
  const id = product._id || product.id;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  alert(`${product.name} added to cart 💙`);
}

// Remove item completely
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// Update quantity
function updateCartQty(id, qty) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.qty = qty;

  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
  }
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
}

// Get total price
function getCartTotal() {
  return cart.reduce(
    (sum, item) => sum + (item.price * item.qty),
    0
  );
}

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const elements = document.querySelectorAll("#cart-count");
  elements.forEach(el => el.innerText = count);
}

// Init on page load
window.addEventListener("load", () => {
  initCart();
  updateCartCount();
});