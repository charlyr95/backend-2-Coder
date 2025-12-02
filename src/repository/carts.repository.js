import { CartsDao } from "../dao/factory.js";

class CartsRepository {
  constructor() {
    this.dao = CartsDao;
  }

  async getCarts() {
    return await this.dao.get();
  }

  async getCartBy(filter) {
    return await this.dao.getBy(filter);
  }

  async addCart() {
    return await this.dao.create();
  }

  async updateCart(id, updatedFields) {
    return await this.dao.update(id, updatedFields);
  }

  async deleteCart(id) {
    return await this.dao.delete(id);
  }

}

export default new CartsRepository();
