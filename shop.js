const products = JSON.parse(localStorage.getItem("products")) || [];
const grid = document.getElementById("productsGrid");

function renderProducts() {
  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = "<p>No products yet</p>";
    return;
  }

  products.forEach(product => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.price} EGP</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);

  const exist = cart.find(item => item.id === id);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 💙");
}

renderProducts();