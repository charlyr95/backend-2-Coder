import fs from "fs";
import ProductModel from "./models/product.model.js";

class ProductsFsDao {
    constructor() {
        this.filePath = "./data/products.json";
    }

    async #readFile() {
        try {
            const data = await fs.promises.readFile(this.filePath, "utf-8");
            if (data.length === 0 || !data) return [];
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async #writeFile(data) {
        if (!data) data = [];
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async get(filter, options) {  //simulate mongoose-like filtering and options (like limit, skip)
        const products = await this.#readFile();
        const filteredProducts = products.filter((product) => {
            for (let key in filter) {
                if (product[key] !== filter[key]) return false;
            }
            return true;
        });
        let result = filteredProducts;
        if (options) {
            const { limit, skip } = options;
            if (skip) {
                result = result.slice(skip);
            }
            if (limit) {
                result = result.slice(0, limit);
            }
        }
        return { docs: result, total: products.length };
    }

    async getBy(filter) {
        const products = await this.#readFile();
        return products.find((product) => {
            for (let key in filter) {
                if (product[key] !== filter[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    async create(product) {
        const products = await this.#readFile();
        const newProduct = new ProductModel(product);
        products.push(newProduct);
        await this.#writeFile(products);
        return newProduct;
    }

    async createMany(products) {
        const existingProducts = await this.#readFile();
        const newProducts = products.map((product) => new ProductModel(product));
        const allProducts = existingProducts.concat(newProducts);
        await this.#writeFile(allProducts);
        return newProducts;
    }

    async update(id, updatedFields) {
        const products = await this.#readFile();
        const index = products.findIndex((product) => product._id === id);
        if (index === -1) {
            return null;
        }
        products[index] = { ...products[index], ...updatedFields };
        await this.#writeFile(products);
        return products[index];
    }

    async delete(id) {
        const products = await this.#readFile();
        const index = products.findIndex((product) => product._id === id);
        if (index === -1) {
            return null;
        }
        const deletedProduct = products.splice(index, 1)[0];
        await this.#writeFile(products);
        return deletedProduct;
    }
}

export default new ProductsFsDao();
