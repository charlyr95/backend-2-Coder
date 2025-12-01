import CartsService from "../service/carts.service.js";

class CartsController {
  constructor() {
    this.service = CartsService;
  }

  getCarts = async (req, res) => {
    try {
      const result = await this.service.getCarts();
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const result = await this.service.getCartById(req.params.cid);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  addCart = async (req, res) => {
    try {
      const result = await this.service.addCart(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  addProduct = async (req, res) => {
    try {
      const result = await this.service.addProduct(req.params.cid, req.params.pid, req.body);
      res.status(200).json({ message: `Producto ${req.params.pid} agregado al carrito ${req.params.cid}`, cart: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  deleteCart = async (req, res) => {
    try {
      await this.service.deleteCart(req.params.cid);
      res.status(200).json({ message: `Carrito ${req.params.cid} eliminado` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  updateCartProducts = async (req, res) => {
    try {
      await this.service.updateCartProducts(req.params.cid, req.body.products);
      res.status(200).json({ message: `Carrito ${req.params.cid} productos actualizados` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      await this.service.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
      res.status(200).json({ message: `Producto ${req.params.pid} cantidad actualizada en carrito ${req.params.cid}` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      await this.service.deleteProduct(req.params.cid, req.params.pid);
      res.status(200).json({ message: `Producto ${req.params.pid} eliminado del carrito ${req.params.cid}` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  clearCart = async (req, res) => {
    try {
      await this.service.clearCart(req.params.cid);
      res.status(200).json({ message: `Carrito ${req.params.cid} vaciado` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new CartsController();