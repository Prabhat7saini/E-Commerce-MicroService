import { Response } from "express";


interface SuccessData {
  [key: string]: any; 
}

const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: SuccessData = {}
): Response => {
  console.log(data);
   return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Function to send an error response
const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { sendSuccessResponse, sendErrorResponse };
