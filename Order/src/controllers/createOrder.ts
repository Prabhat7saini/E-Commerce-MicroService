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
import { DecodedToken } from "../utils/interface";

export const createOrder = async (req: Request & { user?: DecodedToken }, res: Response): Promise<void> => {
  try {
    const { items, totalAmount } = req.body;
    const user = req.user;
    const userid = user.id
    const email = user.email;

    if (!items || !totalAmount) {
      sendErrorResponse(res, 400, message.orderMessages.INVALID_INPUT);
      return;
    }

    // const email = await client.get(`user:${userid}`);
    const newOrder: IOrder = new Order({
      userId: userid,
      items: items,
      totalAmount,
    });
    const OrderData = {
      orderId: newOrder.orderId,
      items,
      totalAmount,
      email
    }

 
    // Save the order to the database

    console.log(OrderData, "email");
    await newOrder.save();

    await client.set(`order:${newOrder.orderId}`, JSON.stringify(newOrder), 'EX', 1200);

    const producer = new Producer();
    await producer.publishMessage("order", OrderData);
    sendSuccessResponse(
      res,
      201,
      message.orderMessages.ORDER_CREATED_SUCCESSFULLY,
      newOrder
    );
  } catch (error) {
    console.error(message.orderMessages.ERROR_CREATING_ORDER, error);
    sendErrorResponse(res, 500, message.orderMessages.INTERNAL_SERVER_ERROR);
  }
};
