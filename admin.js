
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products yet 🛒</p>";
    return;
  }

  products.forEach((p, index) => {
    container.innerHTML += `
      <div class="admin-product">
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>${p.price} EGP</p>

        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

/* ===== ADD PRODUCT ===== */
function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const imageFile = document.getElementById("image").files[0];
  const error = document.getElementById("error");

  error.innerText = "";

  if (!name || !price || !imageFile) {
    error.innerText = "Please fill all fields ❌";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const newProduct = {
      name: name,
      price: Number(price),
      image: reader.result
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();

    // clear inputs
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