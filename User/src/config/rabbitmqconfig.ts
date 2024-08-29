interface RabbitMQConfig {
  url: string;
  exchangeName: string;
}


const rabbitMQConfig: RabbitMQConfig = {
  url: "amqp://localhost",
  exchangeName: "logExchange",
};


export { rabbitMQConfig };
