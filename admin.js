let products = JSON.parse(localStorage.getItem("products")) || [];
const adminProducts = document.getElementById("adminProducts");

// ===== ADD PRODUCT =====
function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageInput = document.getElementById("image");

  if (!name || !price || imageInput.files.length === 0) {
    alert("Fill all fields");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const product = {
      id: Date.now(),
      name,
      price,
      image: reader.result
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    imageInput.value = "";
  };

  reader.readAsDataURL(imageInput.files[0]);
}

// ===== RENDER ADMIN PRODUCTS =====
function renderAdminProducts() {
  adminProducts.innerHTML = "";

  if (products.length === 0) {
    adminProducts.innerHTML = "<p>No products yet</p>";
    return;
  }

  products.forEach((p, index) => {
    adminProducts.innerHTML += `
      <div class="admin-product">
        <img src="${p.image}">
        <div>
          <h4>${p.name}</h4>
          <p>${p.price} EGP</p>
          <button onclick="deleteProduct(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

// ===== DELETE =====
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdminProducts();
}

renderAdminProducts();