// messages.ts

// Define all messages in a single object
const messages = {
  PAYMENT_SUCCESS_CREATED: "Payment success created",
  ERROR_PROCESSING_MESSAGE: "Error processing message:",
};

// Export the messages object
// export default ;


// Define all RabbitMQ-related messages in a single object
const rabbitmqMessages = {
    FAILED_TO_CLOSE_CONNECTION: 'Failed to close RabbitMQ connection:',
    CONNECTION_CLOSED: 'Connection to RabbitMQ closed.',
    FAILED_TO_PUBLISH_MESSAGE: 'Failed to publish message:',
    CONNECTED_AND_CHANNEL_CREATED: 'Connected to RabbitMQ and channel created.',
    FAILED_TO_CONNECT: 'Failed to connect to RabbitMQ:'
};

// Export the rabbitmqMessages object
export default {rabbitmqMessages,messages};