import { sendErrorResponse } from "../utils/sendResponceFunction";
import sendMails from "../utils/sendMailToUser";
import Consumer from "../utils/RabbitMQ/consumer";
import messages from "../utils/message";
import { Request, Response } from "express";
import { rabbitMQConfig } from "../config/rabbitmqConfig";
import { createWelcomeEmailBody } from '../config/emailTemplateSignUP'
import { createOrderConfirmationEmailBody } from '../config/emailTemplateCreateOder'
import { title } from "process";
import { createEmailBody } from "../config/emailTemplate"
export const sendEmail = async () => {
  try {

    const consumer = new Consumer();

    let userDetails: any = null;



    consumer.on("message1", async (data) => {

      const emailBody = createWelcomeEmailBody({ userName: data.message.name })
      const dataemail = {
        email: data.message.email,
        emailBody,
        title: "Account Created In E-commerce"
      }
      await sendMails(dataemail);
      console.log("message1", data);
    });




    consumer.on("message2", async (data) => {

      const emailBody = createOrderConfirmationEmailBody({ orderId: data.message.orderId, items: data.message.items, totalAmount: data.message.totalAmount })
      const dataemail = {
        email: data.message.email,
        emailBody,
        title: "ORDER DETAILS"
      }
      await sendMails(dataemail);
      console.log("message2", data);
    });




    consumer.on("message3", async (data) => {

      const emailBody = createEmailBody({ orderId: data.message.orderId, paymentId: data.message.paymentId, status: data.message.status, totalAmount: data.message.totalAmount });
      const dataemail = {
        email: data.message.email,
        emailBody,
        title: "YOUR PAYMENT DETAILS HERE",
      }
      await sendMails(dataemail);
      console.log("message3", data);
    })






    consumer.on("error", (error) => {
      console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);

    });

    consumer
      .consumeMessages()
      .catch((error) => {
        console.error(messages.messages.ERROR_PROCESSING_MESSAGE, error);
      });


  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
