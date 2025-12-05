import { Schema, model } from "mongoose";


const ticketCollection = "tickets";
const ticketSchema = new Schema({
  code: {
    type: String,
    default: () => uuidv4(),
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export default model(ticketCollection, ticketSchema);
