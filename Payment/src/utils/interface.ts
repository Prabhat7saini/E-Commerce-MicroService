export interface IPayment extends Document {
  toObject(): unknown;
  save(): unknown;
  paymentId: string;
  orderId: string;
  amount: string;
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "other"; 
  status: "pending" | "completed" | "failed" | "refunded";
  
}


export interface Status {
  value: "completed" | "failed";
}


export interface DecodedToken {
  id: string;
  email: string;
}