import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { sendErrorResponse } from "../utils/sendResponceFunction";
import errorMessages from "../utils/errormessage";

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
      return sendErrorResponse(res, 401, errorMessages.TOKEN_MISSING);
    }

    try {
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;
      console.log(decode);
    } catch (error) {
      sendErrorResponse(res, 401, errorMessages.Invalid_Token);
      return;
    }

    next();
  } catch (error) {
    sendErrorResponse(res, 401, error.message);
  }
};
