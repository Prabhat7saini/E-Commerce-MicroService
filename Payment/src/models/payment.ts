import mongoose, { Schema, Document } from "mongoose";
import { IPayment } from "utils/interface";
import { v4 as uuidv4 } from "uuid";

// Define the interface for the Payment document

// Define the schema for the Payment model
const paymentSchema = new Schema<IPayment>(
  {
    paymentId: {
      type: String,
      default: uuidv4,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true,
      ref: "Order",
    },
    amount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create the Mongoose model
const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
