
const messages = {
  PAYMENT_SUCCESS_CREATED: "Payment success created",
  ERROR_PROCESSING_MESSAGE: "Error processing message:",
  TOKEN_MISSING:"Token is missing",
  Invalid_Token:"Invalid token",
  FULLFILLMENT_API_ERROR:"Error in setting up API request",
  NO_RESPONSE_FROM_API:"No response from API",
  MISSING_ORDER_ID:'Missing order id '
};





const rabbitmqMessages = {
    FAILED_TO_CLOSE_CONNECTION: 'Failed to close RabbitMQ connection:',
    CONNECTION_CLOSED: 'Connection to RabbitMQ closed.',
    FAILED_TO_PUBLISH_MESSAGE: 'Failed to publish message:',
    CONNECTED_AND_CHANNEL_CREATED: 'Connected to RabbitMQ and channel created.',
    FAILED_TO_CONNECT: 'Failed to connect to RabbitMQ:'
};

export default {rabbitmqMessages,messages};