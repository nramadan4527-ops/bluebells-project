// ===== Product API (LocalStorage Version) =====

const productAPI = {
  getAll() {
    return JSON.parse(localStorage.getItem("products")) || [];
  },

  saveAll(products) {
    localStorage.setItem("products", JSON.stringify(products));
  },

  add(product) {
    const products = this.getAll();
    products.push(product);
    this.saveAll(products);
    return product;
  },

  update(index, product) {
    const products = this.getAll();
    products[index] = product;
    this.saveAll(products);
  },

  delete(index) {
    const products = this.getAll();
    products.splice(index, 1);
    this.saveAll(products);
  }
};