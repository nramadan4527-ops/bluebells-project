let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const imageInput = document.getElementById("image");

  if (!name || !price || imageInput.files.length === 0) {
    alert("Please fill all fields");
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const product = {
      name: name,
      price: price,
      image: reader.result // base64 image
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully");

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    imageInput.value = "";
  };

  reader.readAsDataURL(file);
}