
/* ===== Load Products from LocalStorage ===== */
let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");
const empty = document.getElementById("empty");
const searchInput = document.getElementById("search");

/* ===== Render Products ===== */
function renderProducts(list = products) {
  grid.innerHTML = "";

  if (list.length === 0) {
    empty.style.display = "block";
    return;
  } else {
    empty.style.display = "none";
  }

  list.forEach((p, index) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>

        <button onclick="shopAddToCart(${index})">
          Add to Cart 🛒
        </button>
      </div>
    `;
  });
}

/* ===== Add To Cart (FIXED) ===== */
function shopAddToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products[index];

  let existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      name: product.name,
      price: Number(product.price),
      image: product.image,
      desc: product.desc || "",
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart 💙");
}

/* ===== Cart Count (FIXED SAFE VERSION) ===== */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = cart.reduce((sum, item) => {
    return sum + (item.qty || 1);
  }, 0);

  const counter = document.getElementById("cart-count");

  if (counter) {
    counter.innerText = totalQty;
  }
}

/* ===== Search ===== */
searchInput.addEventListener("input", function () {
  let value = this.value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});

/* ===== Init ===== */
renderProducts();
updateCartCount();