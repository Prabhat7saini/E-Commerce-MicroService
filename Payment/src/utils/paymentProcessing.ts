
import { Status } from "./interface";


const statuses: Status[] = [{ value: "completed" }, { value: "failed" }];


export function paymentProcess(): Status {
  
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}


