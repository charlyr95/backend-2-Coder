import ProductsRepository from "../repository/products.repository.js";
import ProductsPaginationDto from "../dto/productsPagination.dto.js";
class ProductsService {
    constructor() {
        this.repository = ProductsRepository;
    }

    async getProducts({ limit = 10, page = 1, sort = null, query = null } = {}) {
        const products = await this.repository.getProducts(query ? JSON.parse(query) : {}, { limit, page, sort: sort ? JSON.parse(sort) : {} });
        return new ProductsPaginationDto(products);
    }

    async getProductById(id) {
        return await this.repository.getProductBy({ _id: id });
    }

    async addProduct(product) {
        return await this.repository.addProduct(product);
    }

    async addProducts(products) {
        return await this.repository.addProducts(products);
    }

    async updateProduct(id, updatedFields) {
        return await this.repository.updateProduct(id, updatedFields);
    }

    async deleteProduct(id) {
        return await this.repository.deleteProduct(id);
    }
}

export default new ProductsService();