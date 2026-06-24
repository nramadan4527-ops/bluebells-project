// ===== LOAD PRODUCTS =====
let products = JSON.parse(localStorage.getItem("products")) || [];
const adminProducts = document.getElementById("adminProducts");

// ===== ADD PRODUCT =====
function addProduct() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();

  if (!name || !price || imageInput.files.length === 0) {
    alert("Fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const product = {
      id: Date.now(),
      name: name,
      price: Number(price), // ✅ مهم جداً
      image: reader.result
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    renderAdminProducts();

    // clear form
    nameInput.value = "";
    priceInput.value = "";
    imageInput.value = "";

    alert("Product added successfully ✅");
  };

  reader.readAsDataURL(imageInput.files[0]);
}

// ===== RENDER ADMIN PRODUCTS =====
function renderAdminProducts() {
  if (!adminProducts) return;

  adminProducts.innerHTML = "";

  if (products.length === 0) {
    adminProducts.innerHTML = "<p>No products yet</p>";
    return;
  }

  products.forEach((p, index) => {
    adminProducts.innerHTML += `
      <div class="admin-product">
        <img src="${p.image}" alt="${p.name}">
        <div class="admin-product-info">
          <h4>${p.name}</h4>
          <p>${p.price} EGP</p>
          <button onclick="deleteProduct(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

// ===== DELETE PRODUCT =====
function deleteProduct(index) {
  if (!confirm("Delete this product?")) return;

  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdminProducts();
}

// ===== INIT =====
renderAdminProducts();