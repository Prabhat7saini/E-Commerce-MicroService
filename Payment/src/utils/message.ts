
const messages = {
  PAYMENT_SUCCESS_CREATED: "Payment success created",
  ERROR_PROCESSING_MESSAGE: "Error processing message:",
};





const rabbitmqMessages = {
    FAILED_TO_CLOSE_CONNECTION: 'Failed to close RabbitMQ connection:',
    CONNECTION_CLOSED: 'Connection to RabbitMQ closed.',
    FAILED_TO_PUBLISH_MESSAGE: 'Failed to publish message:',
    CONNECTED_AND_CHANNEL_CREATED: 'Connected to RabbitMQ and channel created.',
    FAILED_TO_CONNECT: 'Failed to connect to RabbitMQ:'
};

export default {rabbitmqMessages,messages};