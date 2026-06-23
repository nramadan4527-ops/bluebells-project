// ===== Load Products =====
let products = JSON.parse(localStorage.getItem("products")) || [];

// ===== Cart =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("productsGrid");
const empty = document.getElementById("empty");
const cartCount = document.getElementById("cart-count");

// ===== Render Products =====
function renderProducts(list = products) {
  grid.innerHTML = "";

  if (!list.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  list.forEach((p, i) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">

        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <span>${p.price} EGP</span>

        <!-- Add to Cart Button -->
        <button class="add-btn" onclick="addToCart(${i})">
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

// ===== Add To Cart =====
function addToCart(index) {
  const product = products[index];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart 🛒");
}

// ===== Cart Count =====
function updateCartCount() {
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// ===== Search =====
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});

// ===== Init =====
renderProducts();
updateCartCount();