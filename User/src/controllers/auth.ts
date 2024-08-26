import {  Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user"; // Adjust the path as necessary
import { SignUpRequest ,LoginRequest} from "../utils/interface";
import { JWT_SECRET } from "../utils/dotenvVariables";
import Producer from '../utils/RabbitMQ/producer'

export const signUp = async (
  req: SignUpRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "Account Successfully created",
    });
  } catch (error) {
    console.error(`Error while signing up: ${error}`);
    return res.status(500).json({
      success: false,
      message: "An error occurred while signing up. Try again later",
    });
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
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist. Please first sign up",
      });
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
      user.password = undefined; // Remove password before sending response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      await producer.publishMessage("info",user)
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login was successful. You have access to your account.",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error(`Error while logging in: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Login failed. Try again later",
    });
  }
};
