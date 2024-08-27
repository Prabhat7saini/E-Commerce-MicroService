import { Request, Response } from "express";
import Order from "../models/order";
import { IOrder } from "utils/interface";
import Producer from "../utils/Rabbitmq/producer";
import message from "../utils/message";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/sendresponceFunction";
import { client } from "../redis/client";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { items, totalAmount, userid } = req.body;

    if (!userid || !items || !totalAmount) {
      sendErrorResponse(res, 400, message.orderMessages.INVALID_INPUT);
      return;
    }

    const email = await client.get(`user:${userid}`);
    const newOrder: IOrder = new Order({
      userId: userid,
      items: items,
      totalAmount,
    });
  
    const orderWithEmail = {
      ...newOrder.toObject(), 
      email, 
    };

    const producer = new Producer();
    await producer.publishMessage("info", orderWithEmail);
    // Save the order to the database

    console.log(orderWithEmail, "email");
    await newOrder.save();
    sendSuccessResponse(
      res,
      201,
      message.orderMessages.ORDER_CREATED_SUCCESSFULLY
    );
  } catch (error) {
    console.error(message.orderMessages.ERROR_CREATING_ORDER, error);
    sendErrorResponse(res, 500, message.orderMessages.INTERNAL_SERVER_ERROR);
  }
};
