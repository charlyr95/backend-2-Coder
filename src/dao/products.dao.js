import Product from "./models/products.model.js";

class ProductsDao {
  constructor(model) {
    this.model = model;
  }

  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      // expected filter: {"category":"calzado","price":{"$gte":45000}}
      if (query && typeof query === "string") {
        query = JSON.parse(query);
      }
      const filter = query ? { ...query } : {};

      const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};
      const skip = (page - 1) * limit;

      const products = await this.model
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);
      const total = await this.model.countDocuments(filter);

      return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    return await this.model.findById(id);
  }

  async addProduct(product) {
    const newProduct = new this.model(product);
    return await newProduct.save();
  }

  async addProducts(products) {
    const newProducts = products.map((product) => new this.model(product));
    return await this.model.insertMany(newProducts);
  }

  async updateProduct(id, updatedFields) {
    return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async deleteProduct(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default new ProductsDao(Product);
