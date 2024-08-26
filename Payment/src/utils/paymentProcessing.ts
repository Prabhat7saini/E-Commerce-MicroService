// Import the Status interface from the appropriate file
import { Status } from "./interface";

// Define the statuses as objects
const statuses: Status[] = [{ value: "completed" }, { value: "cancelled" }];

// Function to get a random status
export function paymentProcess(): Status {
  // Generate a random index to select a status
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

// Example usage:
// const randomStatus = getRandomStatus();
// console.log(`Random status: ${randomStatus.value}`);
