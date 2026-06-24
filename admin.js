document.getElementById("adminForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("p-name").value;
  const price = document.getElementById("p-price").value;
  const image = document.getElementById("p-image").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.push({
    id: Date.now(),
    name,
    price: Number(price),
    image
  });

  localStorage.setItem("products", JSON.stringify(products));

  alert("Product Added ✅");
  this.reset();
});