/* ===== Load Products from Backend API ===== */
let products = [];
let filteredProducts = [];

const grid = document.getElementById("productsGrid");
const empty = document.getElementById("empty");
const searchInput = document.getElementById("search");

/* ===== Initialize Cart ===== */
initCart();

/* ===== Load Products from API ===== */
async function loadProducts() {
  try {
    const response = await ProductAPI.getAll();
    products = response;
    renderProducts(products);
  } catch (err) {
    console.error("Error loading products:", err);
    empty.style.display = "block";
    empty.innerHTML = "<h2>Error loading products 😢</h2><p>Make sure backend is running</p>";
  }
}

/* ===== Render Products ===== */
function renderProducts(list = products) {
  grid.innerHTML = "";

  if (list.length === 0) {
    empty.style.display = "block";
    return;
  } else {
    empty.style.display = "none";
  }

  list.forEach((p) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <button onclick="shopAddToCart({_id: '${p._id}', name: '${p.name}', price: ${p.price}, image: '${p.image}'})">
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

/* ===== Add To Cart (Updated) ===== */
function shopAddToCart(product) {
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  alert("Added to cart 💙");
}

/* ===== Search ===== */
searchInput.addEventListener("input", async function () {
  let value = this.value.toLowerCase();

  if (!value) {
    renderProducts(products);
    return;
  }

  try {
    const results = await ProductAPI.search(value);
    renderProducts(results);
  } catch (err) {
    console.error("Search error:", err);
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    renderProducts(filteredProducts);
  }
});

/* ===== Init ===== */
loadProducts();
