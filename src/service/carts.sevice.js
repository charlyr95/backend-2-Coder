import CartsRepository from "../repository/carts.repository.js";
import ProductsRepository from "../repository/products.repository.js";

class CartsController {
  constructor() {
    this.cartsRepository = CartsRepository;
    this.productsRepository = ProductsRepository;
  }
  

}
export default CartsController;