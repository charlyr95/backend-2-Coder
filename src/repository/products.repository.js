import ProductsDao from "../dao/products.dao.js"

class ProductsRepository {
    constructor() {
        this.dao = ProductsDao;
    }

    async getProducts(options) {
        return await this.dao.get(options);
    }

    async getProductBy(filter) {
        return await this.dao.getBy(filter);
    }

    async addProduct(product) {
        return await this.dao.create(product);
    }

    async addProducts(products) {
        return await this.dao.createMany(products);
    }

    async updateProduct(id, updatedFields) {
        return await this.dao.update(id, updatedFields);
    }

    async deleteProduct(id) {
        return await this.dao.delete(id);
    }
}

export default new ProductsRepository();
