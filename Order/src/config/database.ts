import mongoose from "mongoose";
import { MongoDB_URL } from "../utils/dotenvVariables"; 

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(MongoDB_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error:", (error as Error).message);
    process.exit(1);
  }
};
