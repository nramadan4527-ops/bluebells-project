// ===== Load Products =====
let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("search");

// ===== Render =====
function renderProducts(list = products) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='text-align:center'>No products found</p>";
    return;
  }

  list.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <button onclick='addToCart(${JSON.stringify(p)})'>
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

// ===== Search =====
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const val = this.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(val)
    );
    renderProducts(filtered);
  });
}

// ===== Init =====
renderProducts();
updateCartCount();