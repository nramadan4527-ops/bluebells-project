// ===== Load Products =====
let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("search");

// ===== Render =====
function renderProducts(list = products) {
  grid.innerHTML = "";

  list.forEach((p, index) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <button onclick="addToCart(products[${index}])">
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

// ===== Search =====
searchInput.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(val)
  );
  renderProducts(filtered);
});

// ===== Init =====
renderProducts();
updateCartCount();