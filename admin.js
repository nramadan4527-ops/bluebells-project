let products = JSON.parse(localStorage.getItem("products")) || [];

const adminProducts = document.getElementById("adminProducts");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

/* Preview */
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

/* Add Product */
function addProduct(){
  const name = document.getElementById("name").value.trim();
  const price = Number(document.getElementById("price").value);

  if(!name || !price || !preview.src){
    alert("Fill all fields");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    image: preview.src
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  imageInput.value = "";
  preview.style.display = "none";
}

/* Render */
function renderProducts(){
  adminProducts.innerHTML = "";

  products.forEach(p=>{
    adminProducts.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>${p.price} EGP</p>
      </div>
    `;
  });
}

renderProducts();