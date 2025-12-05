import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas 

class CartModel {
  constructor({_id, products} = {}) {
    this._id = _id || randomUUID();
    this.products = products ? products.map(p => new ProductInCart(p)) : [];
  }
}

class ProductInCart {
  constructor(product = {}) {
    this.product = product.product || product._id || '';
    this.quantity = product.quantity || 1;
  }
}

export default CartModel;