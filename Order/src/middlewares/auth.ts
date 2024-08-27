import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {JWT_SECRET} from '../utils/dotenvVariables'
import { sendErrorResponse } from "../utils/sendresponceFunction";
import errorMessages from "../utils/message";

dotenv.config();

interface DecodedToken {
  userId: string;
  email: string;
}

export const tokenVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies.token ||
      (req.header("Authorization") &&
        req.header("Authorization")!.replace("Bearer ", ""));


    if (!token) {
      return sendErrorResponse(res, 401, errorMessages.orderMessages.TOKEN_MISSING);
    }
    console.log(token,"token")
    try {
      const decode = jwt.verify(
        token,
      JWT_SECRET as string
      ) as DecodedToken;
      console.log(decode);
    } catch (error) {
      sendErrorResponse(res, 401, errorMessages.orderMessages.Invalid_Token);
      return;
    }

    next();
  } catch (error) {
    sendErrorResponse(res, 401, error.message);
  }
};
