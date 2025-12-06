import CartsRepository from "../repository/carts.repository.js";
import ProductsRepository from "../repository/products.repository.js";
import UserRepository from "../repository/user.repository.js";

class CartsService {
  constructor() {
    this.cartsRepository = CartsRepository;
    this.userRepository = UserRepository;
    this.productsRepository = ProductsRepository;
  }

  #getUserCart = async (userId) => {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    const cart = await this.cartsRepository.getCartBy({ _id: user.cart });
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  #updateUserCart = async (userId, cartId) => {
    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    await this.userRepository.updateUser(userId, {cart: cartId});
  }

  async getCarts() {
    return await this.cartsRepository.getCarts();
  }

  async getCartById(id) {
    if (!id) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: id });
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  async addCart(products, userId) {
    const newCart = await this.cartsRepository.addCart({products});
    if(newCart) await this.#updateUserCart(userId, newCart._id);
    return newCart;
  }

  async updateCart(id, updatedFields) {
    if (!id) throw new Error("Cart ID es requerido");
    if (!updatedFields) throw new Error("Updated fields data es requerido");
    return await this.cartsRepository.updateCart(id, updatedFields);
  }

  async deleteCart(id) {
    if (!id) throw new Error("Cart ID es requerido");
    return await this.cartsRepository.deleteCart(id);
  }

  async addProduct(cid, pid) {
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const product = await this.productsRepository.getProductBy({ _id: pid });
    if (!product) throw new Error("Producto no encontrado");
    const productIndex = cart.products.findIndex(p => p.product._id === pid || p.product === pid || p.product._id.toString());
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async clearCart(cid) {
    if (!cid) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    return await this.cartsRepository.updateCart(cid, { products: [] });
  }

  async deleteProduct(cid, pid) {
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const productIndex = cart.products.findIndex(p => p.product._id === pid || p.product === pid || p.product._id.toString());
    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");
    const filteredProducts = cart.products.splice(productIndex, 1);
    return await this.cartsRepository.updateCart(cid, { products: filteredProducts });
  }

  async updateProductQuantity(cid, pid, quantity) {
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    if (quantity == null) throw new Error("Quantity es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const productIndex = cart.products.findIndex(p => p.product._id === pid || p.product === pid || p.product._id.toString());
    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");
    cart.products[productIndex].quantity = quantity;
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async updateCartProducts(cid, products) {
    if (!cid) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    if (!products || !Array.isArray(products)) throw new Error("Products debe ser un array [{product, quantity}]");
    return await this.cartsRepository.updateCart(cid, { products });
  }

}

export default new CartsService();