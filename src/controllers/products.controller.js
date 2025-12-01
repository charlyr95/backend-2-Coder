import ProductsService from "../service/products.service.js";

class ProductsController {

  constructor () {
    this.service = ProductsService;
  }

 getProducts = async (req, res) => {
    try {
      const result = await this.service.getProducts(req.query);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
 getProductById = async (req, res) => {
    try {
      const result = await this.service.getProductById(req.params.pid);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

 addProduct = async (req, res) => {
    try {
      const result = await this.service.addProduct(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  updateProduct = async (req, res) => {
    try {
      const result = await this.service.updateProduct(req.params.pid, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const result = await this.service.deleteProduct(req.params.pid);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default new ProductsController();