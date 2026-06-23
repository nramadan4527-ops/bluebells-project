let products = JSON.parse(localStorage.getItem("products")) || [];
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
function addToCart(i) {
  cart.push(products[i]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ===== Cart Count =====
function updateCartCount() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.innerText = cart.length;
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