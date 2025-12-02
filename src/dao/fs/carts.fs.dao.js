import fs from 'fs'

class CartsFsDao {
  constructor() {
    this.carts = this.#loadCartsFromFile();
    this.filePath = "./data/carts.json";
  }

  async #loadCartsFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      if(data.length === 0) return [];
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async get() {
    const data = await fs.promises.readFile(this.filePath, 'utf-8');
    this.carts = JSON.parse(data);
  }

  async getBy(filter) {
    const {_id} = filter;
    return this.carts.find(cart => cart._id === _id);
  }

  async create(cart) {
    this.carts.push(cart);
    await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
    return cart;
  }

  async update(id, updatedFields) {
    const index = this.carts.findIndex(cart => cart._id === id);
    if (index !== -1) {
      this.carts[index] = { ...this.carts[index], ...updatedFields };
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
      return this.carts[index];
    }
    return null;
  }

  async delete(id) {
    const index = this.carts.findIndex(cart => cart._id === id);
    if (index !== -1) {
      const deletedCart = this.carts.splice(index, 1)[0];
      await fs.promises.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
      return deletedCart;
    }
    return null;
  }

}

export default new CartsFsDao();
