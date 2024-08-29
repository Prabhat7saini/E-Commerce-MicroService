import { Request, Response } from 'express';
import Order from "../models/order";
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendresponceFunction';
import message from '../utils/message';

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ orderId });
        console.log(order, "order")

        if (order) {
            return sendSuccessResponse(res, 200, message.orderMessages.ORDER_SUCCESSFULYY_FETCH, order)

        } else {
            return sendErrorResponse(res, 404, message.orderMessages.ORDER_NOT_FOUND)

        }
    } catch (error) {
        return sendErrorResponse(res, 500, message.orderMessages.INTERNAL_SERVER_ERROR)
    }
};
