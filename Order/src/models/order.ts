import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { IOrder, Item } from "../utils/interface";

const orderSchema = new Schema<IOrder>(
  {
    orderId: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        name: String,
        price: String,
        quantity: String,
      },
    ],
    totalAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "shipped", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);



// Create the Mongoose model
const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
