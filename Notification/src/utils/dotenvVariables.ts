import dotenv from "dotenv";
dotenv.config();

export const MongoDB_URL = process.env.MongoDB_URL;

export const PORT = process.env.PORT;

export const Mail_user= process.env.Mail_user;

export const Mail_host= process.env.Mail_host;

export const Mail_password= process.env.Mail_password;

export  const smtp_port= process.env.smtp_port;