let products = JSON.parse(localStorage.getItem("products")) || [];

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const productsContainer = document.getElementById("products");
const error = document.getElementById("error");

/* ===== ADD PRODUCT ===== */
function addProduct() {
  let name = nameInput.value.trim();
  let price = priceInput.value.trim();
  let imageFile = imageInput.files[0];

  error.innerText = "";

  if (!name || !price || !imageFile) {
    error.innerText = "Please fill all fields ❌";
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let newProduct = {
      id: Date.now(),
      name: name,
      price: Number(price),
      image: reader.result
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    clearInputs();
    renderProducts();

    alert("Product added successfully 💙");
  };

  reader.readAsDataURL(imageFile);
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<p>No products yet</p>";
    return;
  }

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

/* ===== DELETE PRODUCT ===== */
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.splice(index, 1);

  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();
}

/* ===== CLEAR INPUTS ===== */
function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
}

/* ===== INIT ===== */
renderProducts();