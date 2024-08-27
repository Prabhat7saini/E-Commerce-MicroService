import mongoose, { Document } from "mongoose";

// Define the TypeScript interface for the item
export interface Item {
  name: string;
  price: string;
  quantity: string;
}

// Define the TypeScript interface for the Order document
export interface IOrder extends Document {
  orderId: string;
  userId: string;
  items: Item[];
  totalAmount: string;
  status: "pending" | "completed" | "shipped" | "cancelled"; 
 
}
