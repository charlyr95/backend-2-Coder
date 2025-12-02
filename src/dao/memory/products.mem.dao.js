import ProductModel from "./models/product.model.js";

class ProductsMemoryDao {
  constructor() {
    this.products = [];
  }

  async get(filter, options) {
    //simulate mongoose-like filtering and options (like limit, skip)
    const products = this.products.filter((product) => {
      for (let key in filter) {
        if (product[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    }
    );
    // Implement options like limit and skip if provided
    let result = products;
    if (options) {
      const { limit, skip } = options;
      if (skip) {
        result = result.slice(skip);
      }
      if (limit) {
        result = result.slice(0, limit);
      }
    }
    return {docs: result, total: products.length};
  }

  async getBy(filter) {
    return this.products.find((product) => {
      for (let key in filter) {
        if (product[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async create(product) {
    const newProduct = new ProductModel(product);
    this.products.push(newProduct);
    return newProduct;
  }

  async createMany(products) {
    const newProducts = products.map(product => new ProductModel(product));
    this.products.push(...newProducts);
    return newProducts;
  }

  async update(id, updatedFields) {
    const index = this.products.findIndex(product => product._id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      return this.products[index];
    }
    return null;
  }

  async delete(id) {
    const index = this.products.findIndex(product => product._id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1);
      return deletedProduct[0];
    }
    return null;
  }
}

export default new ProductsMemoryDao();
