import { sendErrorResponse } from "../utils/sendResponceFunction";
import sendMails from "../utils/sendMailToUser";
import Consumer from "../utils/RabbitMQ/consumer";
import messages from "../utils/message";
import { Request, Response } from "express";
import { rabbitMQConfig } from "../config/rabbitmqConfig";

export const sendEmail = async () => {
  try {

    const consumer = new Consumer();

    let userDetails: any = null;

    const handleMessage = (
      data: any,
      callback: (error: Error | null) => void
    ) => {
      try {
        console.log(`Received data: ${JSON.stringify(data)}`);
        userDetails = data;
        callback(null);
      } catch (error) {
        callback(error);
      }
    };

    consumer.on("message", (data) =>
      handleMessage(data, (error) => {
        if (error) {
          console.error(messages, error);
          return;
        }
        sendmails();
      })
    );

    consumer.on("error", (error) => {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      
    });

    consumer
      .consumeMessages("fullfillQueue", rabbitMQConfig.exchangeName)
      .catch((error) => {
        console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      });

    const sendmails = async () => {
      const emailDetails = {
        email: userDetails?.message.email,
        orderId: userDetails?.message.orderId,
        paymentId: userDetails.message.paymentId,
        title: "Confirmation Mail",
        status:userDetails?.message.status
      };

      await sendMails(emailDetails);
    };
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
