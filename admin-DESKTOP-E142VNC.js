/* ===================
   Get Elements
=================== */
const productForm = document.getElementById("productForm");
const productIdEl = document.getElementById("productId");
const nameEl = document.getElementById("productName");
const priceEl = document.getElementById("productPrice");
const imageEl = document.getElementById("productImage");
const productTable = document.getElementById("productTable");

/* ===================
   Load Products
=================== */
let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ===================
   Render Table
=================== */
function renderProducts() {
  productTable.innerHTML = "";
  products.forEach((product, index) => {
    productTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td><img src="${product.image}" alt=""></td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td>
          <button class="action-btn edit-btn" onclick="editProduct(${index})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

renderProducts();

/* ===================
   Add / Update
=================== */
productForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const id = productIdEl.value;
  const productData = {
    name: nameEl.value,
    price: parseFloat(priceEl.value),
    image: imageEl.value || "https://via.placeholder.com/50"
  };

  if (id === "") {
    products.push(productData);
  } else {
    products[id] = productData;
  }

  saveProducts();
  renderProducts();
  productForm.reset();
  productIdEl.value = "";
});

/* ===================
   Edit Product
=================== */
function editProduct(i) {
  productIdEl.value = i;
  nameEl.value = products[i].name;
  priceEl.value = products[i].price;
  imageEl.value = products[i].image;
}

/* ===================
   Delete Product
=================== */
function deleteProduct(i) {
  products.splice(i, 1);
  saveProducts();
  renderProducts();
}