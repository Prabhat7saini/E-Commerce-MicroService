
interface RabbitMQConfig {
  url: string;
  exchangeName: string;
}

// Define the configuration object
const rabbitMQConfig: RabbitMQConfig = {
  url: "amqp://localhost",
  exchangeName: "logExchange",
};

// Export the configuration object
export { rabbitMQConfig };
