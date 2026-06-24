
/* ===== LOAD PRODUCTS ===== */
let products = JSON.parse(localStorage.getItem("products")) || [];

const productsContainer = document.getElementById("products");
const error = document.getElementById("error");

/* ===== RENDER ===== */
function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((p, index) => {
    productsContainer.innerHTML += `
      <div class="admin-product">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>${p.price} EGP</p>

        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

/* ===== ADD PRODUCT (FIXED) ===== */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageFile = document.getElementById("image").files[0];

  error.innerText = "";

  if (!name || !price || !imageFile) {
    error.innerText = "Please fill all fields ❌";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const newProduct = {
      name,
      price: Number(price),
      image: reader.result
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
  };

  reader.readAsDataURL(imageFile);
}

/* ===== DELETE PRODUCT ===== */
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

/* ===== INIT ===== */
renderProducts();