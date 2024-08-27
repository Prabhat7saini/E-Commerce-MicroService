import { Request, Response } from "express";
import Order from "../models/order";
import message from "../utils/message";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/sendresponceFunction";

export const updatestatus = async (req: Request, res: Response) => {
  try {
    const { status, orderId } = req.body;

    
    if (!status || !orderId) {
      sendErrorResponse(res, 400, message.orderMessages.INVALID_INPUT);
      return;
    }

    
    const currentOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!currentOrder) {
      sendErrorResponse(res, 404, message.orderMessages.ORDER_NOT_FOUND);
      return;
    }

     
    sendSuccessResponse(res,200,message.orderMessages.ORDER_UPDATE_SUCCESSFULLY);

    return;
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
