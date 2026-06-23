
const searchInput = document.getElementById("search");
const productsGrid = document.getElementById("productsGrid");

let allProducts = productAPI.getAll();

function render(list) {
  productsGrid.innerHTML = "";

  if (list.length === 0) {
    productsGrid.innerHTML = "<p>No products found 😢</p>";
    return;
  }

  list.forEach(p => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" />
        <h3>${p.name}</h3>
        <p class="price">${p.price} EGP</p>
        <p>${p.desc}</p>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;
  });
}

// أول تحميل
render(allProducts);

// search live
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.desc.toLowerCase().includes(value)
  );

  render(filtered);
});