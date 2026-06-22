let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

/* Render Products */
function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product, index) => {
    list.innerHTML += `
      <li>
        <img src="${product.image}" class="product-img">

        <strong>${product.name}</strong> - ${product.price} EGP
        <br>
        <small>${product.desc}</small>
        <br><br>

        <button class="action-btn edit" onclick="editProduct(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteProduct(${index})">Delete</button>
      </li>
    `;
  });
}

/* Preview Image */
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

/* Add or Update Product */
function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value;
  const desc = document.getElementById("productDesc").value;
  const imageInput = document.getElementById("productImage");

  if (!name || !price || (editIndex === null && imageInput.files.length === 0)) {
    alert("Please fill all fields and choose image");
    return;
  }

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      saveProduct(reader.result);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProduct(products[editIndex].image);
  }
}

/* Save Product */
function saveProduct(imageData) {
  const product = {
    id: editIndex !== null ? products[editIndex].id : Date.now(),
    name: document.getElementById("productName").value,
    price: Number(document.getElementById("productPrice").value),
    desc: document.getElementById("productDesc").value,
    image: imageData
  };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));

  clearInputs();
  renderProducts();
}

/* Edit */
function editProduct(index) {
  const p = products[index];

  productName.value = p.name;
  productPrice.value = p.price;
  productDesc.value = p.desc;

  document.getElementById("preview").src = p.image;
  document.querySelector(".image-preview").style.display = "block";

  editIndex = index;
}

/* Delete */
function deleteProduct(index) {
  if (confirm("Delete this product?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

/* Clear */
function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("productImage").value = "";

  document.getElementById("preview").src = "";
  document.querySelector(".image-preview").style.display = "none";
}

/* init */
renderProducts();