let products = productAPI.getAll();
let editIndex = null;

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p, i) => {
    list.innerHTML += `
      <li>
        <img src="${p.image}" class="product-img">
        <strong>${p.name}</strong> - ${p.price} EGP
        <p>${p.desc}</p>

        <button onclick="editProduct(${i})">Edit</button>
        <button onclick="deleteProduct(${i})">Delete</button>
      </li>
    `;
  });
}

function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("preview").src = reader.result;
    document.querySelector(".image-preview").style.display = "block";
  };
  reader.readAsDataURL(file);
}

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const desc = document.getElementById("productDesc").value;
  const imageInput = document.getElementById("productImage");

  if (!name || !price) {
    alert("Fill required fields");
    return;
  }

  const save = (img) => {
    const product = {
      name,
      price,
      desc,
      image: img
    };

    if (editIndex !== null) {
      products[editIndex] = product;
      productAPI.update(editIndex, product);
      editIndex = null;
    } else {
      productAPI.add(product);
      products.push(product);
    }

    renderProducts();
    clearInputs();
  };

  if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => save(reader.result);
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    save(products[editIndex]?.image || "");
  }
}

function editProduct(i) {
  const p = products[i];

  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productDesc").value = p.desc;

  document.getElementById("preview").src = p.image;
  document.querySelector(".image-preview").style.display = "block";

  editIndex = i;
}

function deleteProduct(i) {
  productAPI.delete(i);
  products = productAPI.getAll();
  renderProducts();
}

function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDesc").value = "";
  document.getElementById("productImage").value = "";
}

renderProducts();