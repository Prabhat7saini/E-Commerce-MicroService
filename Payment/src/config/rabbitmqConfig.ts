interface RabbitMQConfig {
  url: string;
  exchangeName: string;
  exchangeNameLogexchange:string;
}


const rabbitMQConfig: RabbitMQConfig = {
  url: "amqp://localhost",
  exchangeName: "logExchange",
  exchangeNameLogexchange: "orderExchange",
};


export { rabbitMQConfig };
