import { sendErrorResponse } from "../utils/sendResponceFunction";
import sendMails from "../utils/sendMailToUser";
import Consumer from "../utils/RabbitMQ/consumer";
import messages from "../utils/message";
import { Request, Response } from "express";

// Define the email details

// Call the mailSender function
export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const consumer = new Consumer();

    let userDetails: any = null;

    const handleMessage = (  data: any, callback: (error: Error | null) => void ) => {
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
          sendErrorResponse(
            res,
            500,
            messages.messages.ERROR_PROCESSING_MESSAGE
          );
          return;
        }
        sendmails();
      })
    );

    consumer.on("error", (error) => {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
    });

    consumer.consumeMessages().catch((error) => {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      sendErrorResponse(res, 500, messages.messages.ERROR_PROCESSING_MESSAGE);
    });

   
    const sendmails = async () => {
      const email = userDetails.message.email;
      const maildata = {
        email,
        orderId,
      };
      await sendMails(maildata);
    };
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
