export interface IPayment extends Document {
  save(): unknown;
  paymentId: string;
  orderId: string;
  amount: string;
  paymentMethod: "credit_card" | "paypal" | "bank_transfer" | "other"; 
  status: "pending" | "completed" | "failed" | "refunded";
  
}


export interface Status {
  value: "completed" | "cancelled";
}