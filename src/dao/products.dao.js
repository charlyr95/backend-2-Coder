import ProductModel from "./models/products.model.js";

class ProductsDao {
    constructor() {
      this.model = ProductModel;
    }

    async get(options){
      return await this.model.paginate({}, options);
    }

    async getBy(filter){
      return await this.model.findOne(filter);
    }

    async create(product) {
      const newProduct = new this.model(product);
      return await newProduct.save();
    }

    async createMany(products) {
      const newProducts = products.map((product) => new this.model(product));
      return await this.model.insertMany(newProducts);
    }

    async update(id, updatedFields) {
      return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
    }

    async delete(id) {
      return await this.model.findByIdAndDelete(id);
    }
}

export default new ProductsDao();
