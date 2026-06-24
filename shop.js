let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("products-container");

/* ===== RENDER PRODUCTS ===== */
function renderProducts(list = products) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='text-align:center'>No products found</p>";
    return;
  }

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

/* ===== ADD TO CART ===== */
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products[index];

  let existing = cart.find(i => i.name === product.name);

  if (existing) {
    existing.qty += 1;
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

/* ===== CART COUNT ===== */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const counter = document.getElementById("cart-count");
  if (counter) counter.innerText = totalQty;
}

/* ===== INIT ===== */
renderProducts();
updateCartCount();