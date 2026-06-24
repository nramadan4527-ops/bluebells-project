let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");

// ===== Render Products =====
function renderProducts(list = products) {
  grid.innerHTML = "";

  list.forEach((p, index) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <button onclick="addToCart(${index})">
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

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

  alert("Added to cart 💙");
}

// ===== CART COUNT =====
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const counter = document.getElementById("cart-count");
  if (counter) counter.innerText = total;
}

// ===== INIT =====
renderProducts();
updateCartCount();