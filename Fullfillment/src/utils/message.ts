
const orderMessages = {
  ORDER_CREATED_SUCCESSFULLY: "Order created successfully",
  ERROR_CREATING_ORDER: "Error creating order:",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_INPUT: "Invalid input",
  ORDER_NOT_FOUND: "Order not found",
  ORDER_UPDATE_SUCCESSFULLY: 'Order fulfilled successfully',
  NO_APIRES:'No response received from API',
  Required_FIELD: 'Missing required fields',
  ERROR_SETTING_API_REQUEST:'Error in setting up API request'
};

const rabbitmqMessages = {
  FAILED_TO_CLOSE_CONNECTION: "Failed to close RabbitMQ connection:",
  CONNECTION_CLOSED: "Connection to RabbitMQ closed.",
  FAILED_TO_PUBLISH_MESSAGE: "Failed to publish message:",
  CONNECTED_AND_CHANNEL_CREATED: "Connected to RabbitMQ and channel created.",
  FAILED_TO_CONNECT: "Failed to connect to RabbitMQ:",
};

export default { rabbitmqMessages, orderMessages };
