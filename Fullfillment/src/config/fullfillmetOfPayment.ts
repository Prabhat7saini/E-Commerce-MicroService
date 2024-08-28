import { Request, Response } from "express";
import amqp from "amqplib/callback_api";
import axios from "axios";
import Producer from "../utils/RabbitMQ/producer";
import Consumer from "../utils/RabbitMQ/consumer";
import { UpdateOrder_API } from "../utils/dotenvVariables";

export const fulfillment = (req: Request, res: Response) => {
  const consumer = new Consumer();
  const producer = new Producer();
  let paymentDetails: any = null;
  let responseSent = false; // Flag to track if the response has been sent

  const handleMessage = (
    data: any,
    callback: (error: Error | null) => void
  ) => {
    try {
      console.log("Processing received data:", data);
      paymentDetails = data;
      callback(null);
    } catch (error) {
      callback(error);
    }
  };

  consumer.on("message", (data) => {
    if (responseSent) return; // Prevent multiple responses
    handleMessage(data, (error) => {
      if (error) {
        console.error("Error processing message:", error);
        if (!responseSent) {
          res
            .status(500)
            .json({ message: "Error processing message", success: false });
          responseSent = true; // Set flag to true after response is sent
        }
        return;
      }
      updateOrder();
    });
  });

  consumer.on("error", (error) => {
    if (responseSent) return; // Prevent multiple responses
    console.error("Error consuming messages:", error);
    res
      .status(500)
      .json({ message: "Error consuming messages", success: false });
    responseSent = true; // Set flag to true after response is sent
  });

  consumer.consumeMessages().catch((error) => {
    if (responseSent) return; // Prevent multiple responses
    console.error("Error starting message consumption:", error);
    res
      .status(500)
      .json({ message: "Error starting message consumption", success: false });
    responseSent = true; // Set flag to true after response is sent
  });

  const updateOrder = async () => {
    if (responseSent) return; // Prevent multiple responses

    try {
      const orderId = paymentDetails?.message.orderId;
      const status = paymentDetails?.message.status;

      await axios.put(UpdateOrder_API, {
        status,
        orderId,
      });

      const data = {
        email: paymentDetails?.message.email,
        paymentId: paymentDetails?.message.paymentId,
        orderId: paymentDetails?.message.orderId,
        status: paymentDetails?.message.status,
      };

      console.log("data sent ", data);
      await producer.publishMessage("info", data);

      if (!responseSent) {
        res
          .status(200)
          .json({ message: "Order updated successfully", success: true });
        responseSent = true; // Set flag to true after response is sent
      }
    } catch (error) {
      console.error("Error updating order:", error);
      if (!responseSent) {
        res
          .status(500)
          .json({ message: "Error updating order", success: false });
        responseSent = true; // Set flag to true after response is sent
      }
    }
  };
};
