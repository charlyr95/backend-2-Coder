import fs from 'fs'
import ProductModel from './models/product.model.js';

class ProductsFsDao {
    constructor() {
        this.products = [];
        this.filePath = './data/products.json';
    }

    async get(filter, options) {
        return await this.model.paginate(filter, options);
    }

    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    async create(product) {
        const newProduct = new ProductModel(product);
        return await newProduct.save();
    }

    async createMany(products) {
        const newProducts = products.map((product) => new ProductModel(product));
        await fs.promises.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
        return newProducts;
    }

    async update(id, updatedFields) {
        return await this.model.findByIdAndUpdate(id, updatedFields, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

export default new ProductsFsDao();
