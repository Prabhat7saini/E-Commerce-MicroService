import dotenv from 'dotenv'
dotenv.config();

export const MongoDB_URL = process.env.MongoDB_URL;

export const PORT=process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;

