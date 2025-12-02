import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";
const productSchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: [3, "Título debe tener al menos 3 caracteres"],
    maxlength: [40, "Título debe tener como máximo 40 caracteres"],
    required: true,
  },
  description: {
    type: String,
    trim: true,
    minlength: [10, "Descripción debe tener al menos 10 caracteres"],
    maxlength: [240, "Descripción debe tener como máximo 240 caracteres"],
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    min: [0, "El precio debe ser positivo"],
    max: [999999.99, "Se excedió el precio máximo permitido"],
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    min: [0, "El stock debe ser positivo"],
    default: 0,
  },
  category: {
    type: String,
    default: "uncategorized",
  },
  thumbnails: {
    type: [String],
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);
export default model(productsCollection, productSchema);
