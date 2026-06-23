let products = productAPI.getAll();

const grid = document.getElementById("productsGrid");
const empty = document.getElementById("empty");

function renderProducts(list = products) {
  grid.innerHTML = "";

  if (!list.length) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  list.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <span>${p.price} EGP</span>
      </div>
    `;
  });
}

renderProducts();