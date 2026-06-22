/* ===== Admin Panel with Backend API ===== */

let products = [];
let editIndex = null;

/* ===== Load Products from Backend ===== */
async function loadProducts() {
  try {
    const token = Auth.getToken();
    products = await ProductAPI.getAll();
    renderProducts();
  } catch (err) {
    console.error("Error loading products:", err);
    alert("Error loading products. Make sure backend is running.");
  }
}

/* ===== Render Products List ===== */
function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product, index) => {
    list.innerHTML += `
      <li>
        <img src="${product.image}" class="product-img" style="max-width: 100px; border-radius: 8px;">

        <strong>${product.name}</strong> - ${product.price} EGP
        <br>
        <small>${product.description}</small>
        <br><br>

        <button class="action-btn edit" onclick="editProduct(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteProduct(${index})">Delete</button>
      </li>
    `;
  });
}

/* ===== Preview Image ===== */
function previewImage(event) {
  const preview = document.getElementById("preview");
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
    preview.parentElement.style.display = "block";
  };

  reader.readAsDataURL(file);
}

/* ===== Add Product to Backend ===== */
async function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value;
  const desc = document.getElementById("productDesc").value;
  const imageInput = document.getElementById("productImage");

  if (!name || !price) {
    alert("Please fill in name and price");
    return;
  }

  if (editIndex === null && imageInput.files.length === 0) {
    alert("Please select an image");
    return;
  }

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      saveProductToBackend(reader.result, name, price, desc);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProductToBackend(products[editIndex].image, name, price, desc);
  }
}

/* ===== Save Product to Backend ===== */
async function saveProductToBackend(imageData, name, price, desc) {
  try {
    const token = Auth.getToken();

    if (!token) {
      alert("You must be logged in to add products");
      return;
    }

    const productData = {
      name: name,
      price: Number(price),
      description: desc,
      image: imageData,
      category: "Accessories",
      stock: 10
    };

    let response;

    if (editIndex !== null) {
      response = await ProductAPI.update(products[editIndex]._id, productData, token);
      if (!response.error) {
        products[editIndex] = response.product;
        editIndex = null;
      }
    } else {
      response = await ProductAPI.create(productData, token);
      if (!response.error) {
        products.push(response.product);
      }
    }

    if (response.error) {
      throw new Error(response.error);
    }

    alert("Product saved successfully!");
    clearInputs();
    renderProducts();

  } catch (err) {
    console.error("Save error:", err);
    alert("Error saving product: " + err.message);
  }
}

/* ===== Edit Product ===== */
function editProduct(index) {
  const p = products[index];

  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productDesc").value = p.description;

  document.getElementById("preview").src = p.image;
  document.querySelector(".image-preview").style.display = "block";

  editIndex = index;
}

/* ===== Delete Product from Backend ===== */
async function deleteProduct(index) {
  if (!confirm("Delete this product?")) return;

  try {
    const token = Auth.getToken();
    const response = await ProductAPI.delete(products[index]._id, token);

    if (response.error) {
      throw new Error(response.error);
    }

    products.splice(index, 1);
    renderProducts();
    alert("Product deleted!");

  } catch (err) {
    console.error("Delete error:", err);
    alert("Error deleting product: " + err.message);
  }
}

/* ===== Clear Inputs ===== */
function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("productImage").value = "";

  document.getElementById("preview").src = "";
  document.querySelector(".image-preview").style.display = "none";
}

/* ===== Initialize on Page Load ===== */
window.addEventListener("load", () => {
  if (!Auth.isLoggedIn()) {
    alert("Please login first");
    window.location.href = "admin-login.html";
    return;
  }

  loadProducts();
});
