import { Schema, model } from "mongoose";


const ticketCollection = "tickets";
const ticketSchema = new Schema({
  code: {
    type: String,
    default: () => Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 9),
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  order_detail: {
    type: Array,
    default: [],
    required: true,
  },
  purchaser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default model(ticketCollection, ticketSchema);
