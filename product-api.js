const productAPI = {
  key: "products",

  // ===== Get All Products =====
  getAll() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  },

  // ===== Add Product =====
  add(product) {
    const products = this.getAll();

    const newProduct = {
      id: Date.now(),           // 🔥 مهم جدًا
      name: product.name,
      price: Number(product.price),
      desc: product.desc || "",
      image: product.image || ""
    };

    products.push(newProduct);
    localStorage.setItem(this.key, JSON.stringify(products));
  },

  // ===== Update Product =====
  update(index, updatedProduct) {
    const products = this.getAll();

    products[index] = {
      ...products[index],       // نحافظ على id
      ...updatedProduct
    };

    localStorage.setItem(this.key, JSON.stringify(products));
  },

  // ===== Delete Product =====
  delete(index) {
    const products = this.getAll();
    products.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(products));
  }
};