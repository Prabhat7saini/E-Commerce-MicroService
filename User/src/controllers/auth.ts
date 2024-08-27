import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user"; // Adjust the path as necessary
import { SignUpRequest, LoginRequest } from "../utils/interface";
import { JWT_SECRET } from "../utils/dotenvVariables";
import Producer from "../utils/RabbitMQ/producer";
import errorMessages from "../utils/errormessage";
import { client } from "../redis/index";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/sendResponceFunction";

export const signUp = async (
  req: SignUpRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      sendErrorResponse(res, 403, errorMessages.FIELD_REQUIRED);
      return;
    }

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      sendErrorResponse(res, 400, errorMessages.USER_EXIST);
      return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendSuccessResponse(res, 200, errorMessages.ACCOUNT_CREATED, user);
    return;
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
    sendErrorResponse(res, 500, errorMessages.SIGNUP_ERROR);
    return;
  }
};

export const login = async (
  req: LoginRequest,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const producer = new Producer();

    if (!email || !password) {
      sendErrorResponse(res, 403, errorMessages.FIELD_REQUIRED);
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      sendErrorResponse(res, 401, errorMessages.USER_NOT_EXITS);
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: "3h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // publish user to rabbit mq server
      // await producer.publishMessage("info", user);

      if (!(await client.get(`${user._id}`))) {
        await client.set(`user:${user._id}`, `${user.email},`, "EX", 10800);
      }

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login was successful. You have access to your account.",
      });
    } else {
      sendErrorResponse(res, 401, errorMessages.Invalid_password);
      return;
    }
  } catch (error) {
    console.error(`Login error ${errorMessages.server_ERROR} ${error}`);
    sendErrorResponse(res, 500, errorMessages.server_ERROR);
    return;
  }
};
