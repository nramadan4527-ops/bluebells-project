let products = JSON.parse(localStorage.getItem("products")) || [];

const grid = document.getElementById("productsGrid");

function renderProducts() {
  grid.innerHTML = "";

  products.forEach((p, index) => {
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

function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products[index];

  let existing = cart.find(i => i.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert("Added to cart 💙");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce((s, i) => s + i.qty, 0);

  let counter = document.getElementById("cart-count");
  if (counter) counter.innerText = total;
}

renderProducts();
updateCartCount();