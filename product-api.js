const productAPI = {
  getAll() {
    return JSON.parse(localStorage.getItem("products")) || [];
  },

  add(product) {
    const products = this.getAll();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  },

  update(index, product) {
    const products = this.getAll();
    products[index] = product;
    localStorage.setItem("products", JSON.stringify(products));
  },

  delete(index) {
    const products = this.getAll();
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
};