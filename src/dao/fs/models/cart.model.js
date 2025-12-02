import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas 

class CartModel {
  constructor() {
    this._id = randomUUID();
    this.products = []; 
  }
}

export default CartModel;