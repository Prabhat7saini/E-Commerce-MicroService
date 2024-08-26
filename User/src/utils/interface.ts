import { Request } from "express";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  token?:string
}

export interface SignUpRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
