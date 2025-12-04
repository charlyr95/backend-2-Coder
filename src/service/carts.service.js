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
    user.cart = cartId;
    await this.userRepository.updateUser(userId, user);
  }

  async getCarts() {
    return await this.cartsRepository.getCarts();
  }

  async getCartById(id) {
    //TODO: Implementar obtener carrito del usuario autenticado
    if (!id) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: id });
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  async addCart() {
    //TODO: Implementar creación de carrito para usuario autenticado
    return await this.cartsRepository.addCart();
  }

  async updateCart(id, updatedFields) {
    // TODO: Implementar actualización de carrito para usuario autenticado
    if (!id) throw new Error("Cart ID es requerido");
    if (!updatedFields) throw new Error("Updated fields data es requerido");
    return await this.cartsRepository.updateCart(id, updatedFields);
  }

  async deleteCart(id) {
    // TODO: Implementar eliminación de carrito para usuario autenticado
    if (!id) throw new Error("Cart ID es requerido");
    return await this.cartsRepository.deleteCart(id);
  }

  async addProduct(cid, pid) {
    // TODO: Implementar agregar producto al carrito del usuario autenticado
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const product = await this.productsRepository.getProductBy({ _id: pid });
    if (!product) throw new Error("Producto no encontrado");
    const productIndex = cart.products.findIndex(p => p.product === pid || p.product._id.toString() === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async clearCart(cid) {
    // TODO: Implementar vaciar carrito del usuario autenticado
    if (!cid) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    return await this.cartsRepository.updateCart(cid, { products: [] });
  }

  async deleteProduct(cid, pid) {
    // TODO: Implementar eliminar producto del carrito del usuario autenticado
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const filteredProducts = cart.products.filter(p => p.product._id.toString() !== pid);
    if (filteredProducts.length === cart.products.length) throw new Error("Producto no encontrado en el carrito");
    return await this.cartsRepository.updateCart(cid, { products: filteredProducts });
  }

  async updateProductQuantity(cid, pid, quantity) {
    // TODO: Implementar actualizar cantidad de producto en el carrito del usuario autenticado
    if (!cid) throw new Error("Cart ID es requerido");
    if (!pid) throw new Error("Product ID es requerido");
    if (quantity == null) throw new Error("Quantity es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);
    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");
    cart.products[productIndex].quantity = quantity;
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async updateCartProducts(cid, products) {
    // TODO: Implementar actualizar productos del carrito del usuario autenticado
    if (!cid) throw new Error("Cart ID es requerido");
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    return await this.cartsRepository.updateCart(cid, { products });
  }

}

export default new CartsService();