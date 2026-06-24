function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const product = products.find(p => p.id === id);
  if (!product) return;

  const exist = cart.find(item => item.id === id);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 💙");
}