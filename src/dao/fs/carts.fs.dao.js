import fs from 'fs'
import CartModel from './models/cart.model.js';

class CartsFsDao {
  constructor() {
    this.carts = this.#readFile();
    this.filePath = "./data/carts.json";
  }

  async #readFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      if(data.length === 0 || !data) return [];
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async #writeFile(data) {
    if (!data) data = [];
    await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async get() {
    const carts = await this.#readFile();
    return carts;
  }

  async getBy(filter) {
    const carts = await this.#readFile();
    return carts.find((cart) => {
      for (let key in filter) {
        if (cart[key] !== filter[key]) return false;
      }
      return true;
    });
  }

  async create(cart) {
    const carts = await this.#readFile();
    const newCart = new CartModel(cart);
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
  }

  async update(id, updatedFields) {
    const carts = await this.#readFile();
    const index = carts.findIndex(cart => cart._id === id);
    if (index !== -1) {
      carts[index] = { ...carts[index], ...updatedFields };
      await this.#writeFile(carts);
      return carts[index];
    }
    return null;
  }

  async delete(id) {
    const carts = await this.#readFile();
    const index = carts.findIndex(cart => cart._id === id);
    if (index !== -1) {
      const deletedCart = carts.splice(index, 1)[0];
      await this.#writeFile(carts);
      return deletedCart;
    }
    return null;
  }

}

export default new CartsFsDao();
