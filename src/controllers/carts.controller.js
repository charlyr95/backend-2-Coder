import CartDao from "../dao/carts.dao.js";

export class CartsController {

  static dao = CartDao

  static getCarts = async (req, res, next) => {
    try {
      const carts = await this.dao.getCarts();
      res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }

  static getCartById = async (req, res, next) => {
    try {
      const cart = await this.dao.getCartById(req.params.cid);
      if (!cart) return res.status(404).send({ error: "Carrito no encontrado" });
      res.send(cart);
    } catch (error) {
      next(error);
    }
  }

  static addCart = async (req, res, next) => {
    try {
      const carts = await this.dao.addCart();
      res.status(201).json(carts);
    } catch (error) {
      next(error);
    }
  }

  static addProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await this.dao.addProductToCart(cid, pid);
      res.status(200).json({ message: `Producto ${pid} agregado al carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  static deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      await this.dao.deleteCart(cid);
      res.status(200).json({ message: `Carrito ${cid} eliminado` });
    } catch (error) {
      next(error);
    }
  }

  static updateCartProducts = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      await this.dao.updateCartProducts(cid, products);
      res.status(200).json({ message: `Carrito ${cid} productos actualizados` });
    } catch (error) {
      next(error);
    }
  }

  static updateProductQuantity = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      await this.dao.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({ message: `Producto ${pid} cantidad actualizada en carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  static deleteProduct = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await this.dao.deleteProduct(cid, pid);
      res.status(200).json({ message: `Producto ${pid} eliminado del carrito ${cid}` });
    } catch (error) {
      next(error);
    }
  }

  static clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      await this.dao.clearCart(cid);
      res.status(200).json({ message: `Carrito ${cid} vaciado` });
    } catch (error) {
      next(error);
    }
  }
}

// import CartDao from "../daos/carts.dao.js";

// export class CartsController {

//   static getCarts = async (req, res, next) => {
//     res.status(200).json({ dbg: 'getCarts method called' });
//   }

//   static getCartById = async (req, res, next) => {
//     res.status(200).json({ dbg: 'getCartById method called' });
//   }

//   static addCart = async (req, res, next) => {
//     res.status(200).json({ dbg: 'addCart method called' });
//   }

//   static addProduct = async (req, res, next) => {
//     res.status(200).json({ dbg: 'addProduct method called' });

//   }

//   static deleteCart = async (req, res, next) => {
//     res.status(200).json({ dbg: 'deleteCart method called' });
//   }

//   static updateCartProducts = async (req, res, next) => {
//     res.status(200).json({ dbg: 'updateCartProducts method called' });
//   }

//   static updateProductQuantity = async (req, res, next) => {
//     res.status(200).json({ dbg: 'updateProductQuantity method called' });
//   }

//   static deleteProduct = async (req, res, next) => {
//     res.status(200).json({ dbg: 'deleteProduct method called' });
//   }

//   static clearCart = async (req, res, next) => {
//     res.status(200).json({ dbg: 'clearCart method called' });
//   }
// }