interface RabbitMQConfig {
  url: string;
  exchangeName: string;
  exchangeNameLogexchange:string;
}

// Define the configuration object
const rabbitMQConfig: RabbitMQConfig = {
  url: "amqp://localhost",
  exchangeName: "PaymentExchange",
  exchangeNameLogexchange: "orderExchange",
};

// Export the configuration object
export { rabbitMQConfig };
