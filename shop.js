/* ===== Load Products ===== */
let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("search");

/* ===== Render Products ===== */
function renderProducts(list = products) {
  grid.innerHTML = "";

  list.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} EGP</p>

        <button onclick='addToCart({
          id: ${product.id},
          name: "${product.name}",
          price: ${product.price},
          image: "${product.image}"
        })'>
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

/* ===== SEARCH ===== */
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});

/* ===== INIT ===== */
renderProducts();