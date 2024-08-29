import { Request, Response } from 'express';
import axios from 'axios';
import Producer from '../utils/RabbitMQ/producer';
import { UpdateOrder_API } from '../utils/dotenvVariables';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponceFunction';
import message from '../utils/message';

export const fulfillment = async (req: Request, res: Response): Promise<Response> => {
  const producer = new Producer();
  const { orderId, paymentId, status, email, totalAmount } = req.body;
console.log(orderId, paymentId, status, email,"check");
  try {

    if (!orderId || !paymentId || !status) {
      return sendErrorResponse(res, 400, message.orderMessages.Required_FIELD)

    }


    await axios.put(UpdateOrder_API, { orderId, status });


    const data = {
      orderId,
      paymentId,
      status,
      email,
      totalAmount
    };

    try {

      await producer.publishMessage("payment", data);
    } catch (rabbitError) {
      console.error(message.rabbitmqMessages.FAILED_TO_PUBLISH_MESSAGE, rabbitError);

      return sendErrorResponse(res, 500, message.rabbitmqMessages.FAILED_TO_PUBLISH_MESSAGE)
    }


    return sendSuccessResponse(res, 200, message.orderMessages.ORDER_UPDATE_SUCCESSFULLY)

  } catch (axiosError) {

    if (axiosError.response) {

      console.error('Error response from API:', axiosError.response.data);
      sendErrorResponse(res, axiosError.response.status, axiosError.response.data.message)
      return;
    } else if (axiosError.request) {

      console.error('No response received from API:', axiosError.request);
      return sendErrorResponse(res, 500, message.orderMessages.NO_APIRES)

    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error in setting up API request:', axiosError.message);
      return sendErrorResponse(res, 5000, message.orderMessages.ERROR_SETTING_API_REQUEST);
    }
  }
};
