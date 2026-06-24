let products = JSON.parse(localStorage.getItem("products")) || [];

// ===== ADD TO CART =====
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products[index];
  if (!product) return;

  let existing = cart.find(i => i.name === product.name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      name: product.name,
      price: Number(product.price),
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ===== CART COUNT =====
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  let counter = document.getElementById("cart-count");
  if (counter) counter.innerText = total;
}

// ===== INIT =====
updateCartCount();