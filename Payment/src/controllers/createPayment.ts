import { Request, Response } from "express";
import Consumer from "../utils/RabbitMq/consumer";
import Producer from "../utils/RabbitMq/producer";
import Payment from "../models/payment";
import { IPayment } from "../utils/interface";
import axios from "axios";
import { paymentProcess } from "../utils/paymentProcessing";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/sendResponceFunction";
import { FULLFILLMENT_API } from "../utils/dotenvVariables";
import messages from "../utils/message";

export const createPayment = async (req: Request, res: Response) => {
  const consumer = new Consumer();
  const producer = new Producer();

  let orderDetails: any = null;

  // Define a callback function to handle message consumption
  const handleMessage = (
    data: any,
    callback: (error: Error | null) => void
  ) => {
    try {
      console.log(`Received data: ${JSON.stringify(data)}`);
      orderDetails = data;
      callback(null); // Success
    } catch (error) {
      callback(error); // Error
    }
  };

  // Register the callback to handle messages
  consumer.on("message", (data) =>
    handleMessage(data, (error) => {
      if (error) {
        console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
        sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
        return;
      }

      // Proceed with payment processing after successfully receiving the message
      processPayment();
    })
  );

  // Handle consumer errors
  consumer.on("error", (error) => {
    console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
    sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
  });

  // Start consuming messages
  consumer.consumeMessages().catch((error) => {
    console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
    sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
  });

  // Function to handle payment processing
  const processPayment = async () => {
    try {
      // Access specific properties
      const orderId = orderDetails?.message.orderId;
      const totalAmount = orderDetails?.message.totalAmount;

      const status = paymentProcess();

      const newPayment: IPayment = await new Payment({
        orderId: orderId,
        amount: totalAmount,
        paymentMethod: "other",
        status: status.value,
      });

      await newPayment.save();

      await producer.publishMessage("info", newPayment);

      // Send the response
      const data = {
        orderId,
        totalAmount,
      };

      sendSuccessResponse(
        res,
        201,
        messages.messages.PAYMENT_SUCCESS_CREATED,
        data
      );

      await axios.get(FULLFILLMENT_API);
    } catch (error) {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
    }
  };
};
