import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../utils/interface";


// Define the User schema
const userSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);


const User = mongoose.model<IUser>("User", userSchema);
export default User;
