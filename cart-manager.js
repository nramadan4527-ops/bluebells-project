// ===== Cart Manager =====
let cart = [];

function initCart() {
  const stored = localStorage.getItem("cart");
  cart = stored ? JSON.parse(stored) : [];
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  console.log("ADD CLICKED", product); // 🔥 مهم

  if (!product || !product.id) {
    alert("Product data missing");
    return;
  }

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  alert("Added to cart 💙");
}

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll("#cart-count")
    .forEach(el => el.innerText = count);
}

window.addEventListener("load", initCart);