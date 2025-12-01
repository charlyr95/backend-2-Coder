import CartsModel from "./models/carts.model.js";

class CartsDao {
  constructor() {
    this.model = CartsModel;
  }

  async get() {
    return await this.model.find().populate("products.product");
  }

  async getBy(filter) {
    return await this.model.find(filter).populate("products.product");
  }

  async create(cart) {
    return await this.model.create(cart);
  }

  async update(id, updatedFields) {
    return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

}

export default new CartsDao();
