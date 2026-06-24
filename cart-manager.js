// ===== Cart Manager =====
let cart = [];

function initCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  if (!product || !product.id) {
    alert("Product data missing ❌");
    console.log(product);
    return;
  }

  const existing = cart.find(i => i.id === product.id);

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
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("#cart-count")
    .forEach(el => el.innerText = count);
}

window.addEventListener("load", initCart);