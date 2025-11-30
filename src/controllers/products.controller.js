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
}

export default new ProductsController();