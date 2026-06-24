const form = document.getElementById("adminForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("p-name").value;
  const price = document.getElementById("p-price").value;
  const image = document.getElementById("p-image").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price: Number(price),
    image
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added successfully ✅");
  form.reset();
});