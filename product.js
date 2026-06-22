let products = JSON.parse(localStorage.getItem("products")) || [];

// Get id from URL
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"), 10);

let product = products.find(p => p.id === id);

if (!product) {
  window.location.href = "shop.html";
} else {
  document.getElementById("p-name").innerText = product.name;
  document.getElementById("p-price").innerText = product.price + " EGP";
  document.getElementById("p-image").src = product.image;
}

// Update cart count display
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.innerText = totalQty;
  }
}

// Add to cart
function addToCart() {
  if (!product) {
    alert("Product not available.");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  let existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      desc: product.desc,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert("Added to cart 💙");
}

window.addEventListener("load", () => {
  updateCartCount();
});