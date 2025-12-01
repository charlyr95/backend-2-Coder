import ProductsRepository from "../repository/products.repository.js";
import DTO from "../dto/productsPagination.dto.js";
class ProductsService {
    constructor() {
        this.repository = ProductsRepository;
    }

    async getProducts({ limit = 10, page = 1, sort = null, query = null } = {}) {
        const products = await this.repository.getProducts(query ? JSON.parse(query) : {}, { limit, page, sort: sort ? JSON.parse(sort) : {} });
        return new DTO(products);
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



// class ProductsService {
//     constructor() {
//         this.repository = ProductsRepository;
//     }

//     async getProducts({ limit = 10, page = 1, sort, query } = {}) {
//         try {
//         // expected filter: {"category":"calzado","price":{"$gte":45000}}
//         if (query && typeof query === "string") {
//             query = JSON.parse(query);
//         }
//         const filter = query ? { ...query } : {};

//         const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};
//         const skip = (page - 1) * limit;

//         const products = await model
//             .find(filter)
//             .sort(sortOption)
//             .skip(skip)
//             .limit(limit);
//         const total = await model.countDocuments(filter);

//         return {
//             products,
//             total,
//             totalPages: Math.ceil(total / limit),
//             page,
//             limit,
//         };
//         } catch (error) {
//         throw error;
//         }
//     }

//     async getProductById(id) {
//         return await model.findById(id);
//     }

//     async addProduct(product) {
//         const newProduct = new model(product);
//         return await newProduct.save();
//     }

//     async addProducts(products) {
//         const newProducts = products.map((product) => new model(product));
//         return await model.insertMany(newProducts);
//     }

//     async updateProduct(id, updatedFields) {
//         return await model.findByIdAndUpdate(id, updatedFields, { new: true });
//     }

//     async deleteProduct(id) {
//         return await model.findByIdAndDelete(id);
//     }
// }

// export default new ProductsDao();
