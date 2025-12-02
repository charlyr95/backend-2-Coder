import { randomUUID } from "crypto"; // Nativo de Node.js para generar IDs únicas

class ProductModel {
    constructor(product) {
        this._id = product._id || randomUUID();
        this.title = product.title
        this.description = product.description;
        this.code = product.code; 
        this.price = product.price || 0;
        this.status = product.status || true;
        this.stock = product.stock || 0;
        this.category = product.category || 'uncategorized';
        this.thumbnails = product.thumbnails || [];
    }
}

export default ProductModel;


