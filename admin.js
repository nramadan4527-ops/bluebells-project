document.getElementById("adminForm").onsubmit = function (e) {
  e.preventDefault();

  const name = document.getElementById("p-name").value;
  const price = document.getElementById("p-price").value;
  const image = document.getElementById("p-image").value;

  const product = {
    id: Date.now(),
    name,
    price,
    image
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("ADDED ✅");
};