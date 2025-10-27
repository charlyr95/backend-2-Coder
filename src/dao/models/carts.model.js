import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
  products: [{
    _id: false,
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'products', 
      required: true 
    },
    quantity: { 
      type: Number, 
      min: 1, 
      default: 1 
    }
  }]
}, { timestamps: true });

export default mongoose.model(cartCollection, cartSchema);