import CartsService from "../service/carts.service.js";

class CartsController {
  constructor() {
    this.service = CartsService;
  }

  getCarts = async (req, res) => {
    try {
      const result = await this.service.getCarts(req.query);
      if (!result) return res.status(404).send({ error: "No se encontraron carritos" });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const result = await this.service.getCartById(req.params.id);
      if (!result) return res.status(404).send({ error: "Carrito no encontrado" });
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
      const { cid, pid } = req.params;
      const result = await this.service.addProduct(cid, pid, req.body);
      res.status(200).json({ message: `Producto ${pid} agregado al carrito ${cid}`, cart: result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      await this.service.deleteCart(cid);
      res.status(200).json({ message: `Carrito ${cid} eliminado` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

  updateCartProducts = async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      await this.dao.updateCartProducts(cid, products);
      res
        .status(200)
        .json({ message: `Carrito ${cid} productos actualizados` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      await this.dao.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({ message: `Producto ${pid} cantidad actualizada en carrito ${cid}`, });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      await this.dao.deleteProduct(cid, pid);
      res.status(200).json({ message: `Producto ${pid} eliminado del carrito ${cid}` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  clearCart = async (req, res) => {
    try {
      const { cid } = req.params;
      await this.dao.clearCart(cid);
      res.status(200).json({ message: `Carrito ${cid} vaciado` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new CartsController();