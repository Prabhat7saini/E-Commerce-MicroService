import { Response } from "express";

// Define the type for the data parameter in the success response function
interface SuccessData {
  [key: string]: any; // You can replace 'any' with a more specific type if needed
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
