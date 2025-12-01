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
        if (!id) throw new Error("Product ID es requerido");
        return await this.repository.getProductBy({ _id: id });
    }

    async addProduct(product) {
        if (!product) throw new Error("Product data es requerido");
        return await this.repository.addProduct(product);
    }

    async addProducts(products) {
        if (!products ||  products.length === 0) throw new Error("Products data es requerido");
        if (!Array.isArray(products)) throw new Error("Products data debe ser un array");
        return await this.repository.addProducts(products);
    }

    async updateProduct(id, updatedFields) {
        if (!id) throw new Error("Product ID es requerido");
        if (!updatedFields) throw new Error("Updated fields data es requerido");
        return await this.repository.updateProduct(id, updatedFields);
    }

    async deleteProduct(id) {
        if (!id) throw new Error("Product ID es requerido");
        return await this.repository.deleteProduct(id);
    }
}

export default new ProductsService();