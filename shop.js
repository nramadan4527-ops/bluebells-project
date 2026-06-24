let products = JSON.parse(localStorage.getItem("products")) || [];
const grid = document.getElementById("productsGrid");

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function renderProducts() {
  grid.innerHTML = "";

  products.forEach((p) => {
    grid.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price} EGP</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      </div>
    `;
  });
}

renderProducts();