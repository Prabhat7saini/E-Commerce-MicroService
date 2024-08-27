interface RabbitMQConfig {
  url: string;
  exchangeName: string;
  exchangeNameLogexchange:string;
}


const rabbitMQConfig: RabbitMQConfig = {
  url: "amqp://localhost",
  exchangeName: "PaymentExchange",
  exchangeNameLogexchange: "orderExchange",
};


export { rabbitMQConfig };
