import CartModel from "./models/cart.model.js";

class CartsMemoryDao {
  constructor() {
    this.carts = [];
  }

  async get() {
    return this.carts;
  }

  async getBy(filter) {
    return this.carts.find(cart => {
      return Object.keys(filter).every(key => cart[key] === filter[key]);
    });
  }

  async create(cart) {
    this.carts.push(new CartModel(cart));
    return cart;
  }

  async update(id, updatedFields) {
    const index = this.carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
      this.carts[index] = new CartModel({ ...this.carts[index], ...updatedFields });
      return this.carts[index];
    }
    return null;
  }

  async delete(id) {
    const index = this.carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
      const deletedCart = this.carts.splice(index, 1);
      return deletedCart[0];
    }
    return null;
  }

}

export default new CartsMemoryDao();
