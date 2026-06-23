let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("productsGrid");
const empty = document.getElementById("empty");

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
        <img src="${p.image}">

        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <span>${p.price} EGP</span>

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
}

// ===== Cart Count =====
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
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