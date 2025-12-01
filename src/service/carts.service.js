import CartsRepository from "../repository/carts.repository.js";
import ProductsRepository from "../repository/products.repository.js";

class CartsService {
  constructor() {
    this.cartsRepository = CartsRepository;
    this.productsRepository = ProductsRepository;
  }

  async getCarts() {
    return await this.cartsRepository.getCarts();
  }

  async getCartById(id) {
    return await this.cartsRepository.getCartBy({ _id: id });
  }

  async addCart() {
    return await this.cartsRepository.addCart();
  }

  async updateCart(id, updatedFields) {
    return await this.cartsRepository.updateCart(id, updatedFields);
  }

  async deleteCart(id) {
    return await this.cartsRepository.deleteCart(id);
  }

  async addProduct(cid, pid) {
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const product = await this.productsRepository.getProductBy({ _id: pid });
    if (!product) throw new Error("Producto no encontrado");
    
    const existingProductIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async clearCart(cid) {
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    cart.products = [];
    return await this.cartsRepository.updateCart(cid, { products: [] });
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await this.cartsRepository.getCartBy({ _id: cid });
    if (!cart) throw new Error("Carrito no encontrado");
    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");
    cart.products[productIndex].quantity = quantity;
    return await this.cartsRepository.updateCart(cid, { products: cart.products });
  }
  
}
export default new CartsService();


// export class CartsController {
//   static dao = CartDao;

//   static getCarts = async (req, res, next) => {
//     try {
//       const carts = await this.dao.getCarts();
//       res.status(200).json(carts);
//     } catch (error) {
//       next(error);
//     }
//   };

//   static getCartById = async (req, res, next) => {
//     try {
//       const cart = await this.dao.getCartById(req.params.cid);
//       if (!cart)
//         return res.status(404).send({ error: "Carrito no encontrado" });
//       res.send(cart);
//     } catch (error) {
//       next(error);
//     }
//   };

//   static addCart = async (req, res, next) => {
//     try {
//       const carts = await this.dao.addCart();
//       res.status(201).json(carts);
//     } catch (error) {
//       next(error);
//     }
//   };

//   static addProduct = async (req, res, next) => {
//     try {
//       const { cid, pid } = req.params;
//       await this.dao.addProductToCart(cid, pid);
//       res
//         .status(200)
//         .json({ message: `Producto ${pid} agregado al carrito ${cid}` });
//     } catch (error) {
//       next(error);
//     }
//   };

//   static deleteCart = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       await this.dao.deleteCart(cid);
//       res.status(200).json({ message: `Carrito ${cid} eliminado` });
//     } catch (error) {
//       next(error);
//     }
//   };

//   static updateCartProducts = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const { products } = req.body;
//       await this.dao.updateCartProducts(cid, products);
//       res
//         .status(200)
//         .json({ message: `Carrito ${cid} productos actualizados` });
//     } catch (error) {
//       next(error);
//     }
//   };

//   static updateProductQuantity = async (req, res, next) => {
//     try {
//       const { cid, pid } = req.params;
//       const { quantity } = req.body;
//       await this.dao.updateProductQuantity(cid, pid, quantity);
//       res
//         .status(200)
//         .json({
//           message: `Producto ${pid} cantidad actualizada en carrito ${cid}`,
//         });
//     } catch (error) {
//       next(error);
//     }
//   };

//   static deleteProduct = async (req, res, next) => {
//     try {
//       const { cid, pid } = req.params;
//       await this.dao.deleteProduct(cid, pid);
//       res
//         .status(200)
//         .json({ message: `Producto ${pid} eliminado del carrito ${cid}` });
//     } catch (error) {
//       next(error);
//     }
//   };

//   static clearCart = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       await this.dao.clearCart(cid);
//       res.status(200).json({ message: `Carrito ${cid} vaciado` });
//     } catch (error) {
//       next(error);
//     }
//   };
// }
