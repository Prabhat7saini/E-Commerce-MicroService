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
  let responseSent = false; // Flag to check if response has been sent

  const sendResponse = (status: number, message: string, data?: any) => {
    if (!responseSent) {
      responseSent = true;
      if (status >= 400) {
        sendErrorResponse(res, status, message);
      } else {
        sendSuccessResponse(res, status, message, data);
      }
    }
  };

  const handleMessage = (
    data: any,
    callback: (error: Error | null) => void
  ) => {
    try {
      console.log(`Received data: ${JSON.stringify(data)}`);
      orderDetails = data;
      callback(null);
    } catch (error) {
      callback(error);
    }
  };

  consumer.on("message", (data) =>
    handleMessage(data, (error) => {
      if (error) {
        console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
        sendResponse(500, messages.messages.ERROR_PROCESSING_MESSAGE);
        return;
      }
      processPayment();
    })
  );

  consumer.on("error", (error) => {
    console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
    sendResponse(500, messages.messages.ERROR_PROCESSING_MESSAGE);
  });

  consumer.consumeMessages().catch((error) => {
    console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
    sendResponse(500, messages.messages.ERROR_PROCESSING_MESSAGE);
  });

  const processPayment = async () => {
    try {
      const orderId = orderDetails?.message.orderId;
      const totalAmount = orderDetails?.message.totalAmount;
      const email = orderDetails?.message.email;
      console.log(email, "email");

      const status = paymentProcess();

      const newPayment: IPayment = await new Payment({
        orderId: orderId,
        amount: totalAmount,
        paymentMethod: "other",
        status: status.value,
        email: email,
      });

      await newPayment.save();

      const paymentObject = newPayment.toObject() as Record<string, any>;
      const paymentWithEmail = { ...paymentObject, email };
      console.log(paymentWithEmail, "paymentWithEmail");
      await producer.publishMessage("info", paymentWithEmail);

      const data = {
        orderId,
        totalAmount,
      };

      sendResponse(201, messages.messages.PAYMENT_SUCCESS_CREATED, data);

      await axios.get(FULLFILLMENT_API);
    } catch (error) {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      sendResponse(500, messages.messages.ERROR_PROCESSING_MESSAGE);
    }
  };
};
