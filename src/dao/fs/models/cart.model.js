import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas 

class CartModel {
  constructor(cart) {
    this._id = cart._id || randomUUID();
    this.products = (cart.products || []).map(p => new ProductCartModel(p)) || []; 
  }
}

class ProductCartModel {
  constructor(product) {
    this.productId = product.productId;
    this.quantity = product.quantity || 1;
  }
}

export default CartModel;