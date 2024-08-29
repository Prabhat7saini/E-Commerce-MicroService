import { Request, Response } from 'express';
import axios from 'axios';
import Payment from '../models/payment';
import { IPayment } from '../utils/interface';
import { paymentProcess } from '../utils/paymentProcessing';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponceFunction';
import {CONFIG_api} from '../config/apiConfig'
import messages from '../utils/message';
import { DecodedToken } from '../utils/interface';
import { client } from '../redis/index'

export const createPayment = async (req: Request & { user?: DecodedToken }, res: Response) => {
  try {
    const { orderid } = req.params;
    const email = req.user?.email;

    if (!orderid) {
      return sendErrorResponse(res, 400, messages.messages.MISSING_ORDER_ID);
    }
    const orderData = await client.get(`order:${orderid}`);
    let newPayment: IPayment = null;
    // Fetch order details
    const status = paymentProcess();
    if (!orderData) {
      const apiResponse = await axios.get(`${CONFIG_api.GET_ORDER_API}/${orderid}`);
      console.log('OrderAPI CALL TOGET ORDER')
      newPayment = new Payment({
        orderId: apiResponse.data.orderId,
        amount: apiResponse.data.totalAmount,
        paymentMethod: "other",
        status: status.value,
      });

      await newPayment.save();
    } else {
      console.log('redis data')
      const redisdata = JSON.parse(orderData);
      console.log(redisdata, "resdodos");
      newPayment = new Payment({
        orderId: redisdata.orderId,
        amount: redisdata.totalAmount,
        paymentMethod: "other",
        status: status.value,
      })
      newPayment.status = status.value;
      await newPayment.save();
    }

    const fulfillmentPayload = {
      orderId: orderid,
      email: email,
      status: status.value,
      paymentId: newPayment.paymentId,
      totalAmount: newPayment.amount
    };

   
    try {
      await axios.post(CONFIG_api.FULLFILLMENT_API, fulfillmentPayload);
    } catch (fulfillmentError) {
      console.error('Error sending request to fulfillment API:', fulfillmentError);
      return sendErrorResponse(res, 500, messages.messages.FULLFILLMENT_API_ERROR);
    }

    // Success response
    return sendSuccessResponse(res, 201, messages.messages.PAYMENT_SUCCESS_CREATED, { success: true });

  } catch (error) {
    console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);


    if (axios.isAxiosError(error)) {
     
      if (error.response) {
       
        return sendErrorResponse(res, error.response.status, error.response.data.message || messages.messages.ERROR_PROCESSING_MESSAGE);
      } else if (error.request) {
   
        return sendErrorResponse(res, 500, messages.messages.NO_RESPONSE_FROM_API);
      }
    }

  
    return sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
  }
};
