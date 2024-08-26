import message from '../message'
import amqp from "amqplib";
import { rabbitMQConfig } from "../../config/rabbitmqconfig";


// Define the type for the message
type Message = string | object;

class Producer {
  private channel?: amqp.Channel;
  private connection?: amqp.Connection;

  // Method to connect to RabbitMQ
  private async connectToRabbitMQ(): Promise<void> {
    if (this.connection && this.channel) {
      return; // Already connected
    }

    try {
      // Create a new connection and channel if not already present
      this.connection = await amqp.connect(rabbitMQConfig.url);
      this.channel = await this.connection.createChannel();
      console.log(message.CONNECTED_AND_CHANNEL_CREATED);
    } catch (error) {
      console.error(message.FAILED_TO_CONNECT, error);
      throw error; // Re-throw the error for upstream handling
    }
  }

  // Method to publish a message
  async publishMessage(routingKey: string, message: Message): Promise<void> {
    if (!this.channel || !this.connection) {
      // Ensure connection and channel are established
      await this.connectToRabbitMQ();
    }

    try {
      await this.channel.assertExchange(rabbitMQConfig.exchangeName, "direct", {
        durable: false,
      });

      const logDetails = {
        logType: routingKey,
        message: message,
        dateTime: new Date(),
      };

      this.channel.publish(
        rabbitMQConfig.exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
      );

      console.log(
        `The message '${message}' is sent to exchange '${rabbitMQConfig.exchangeName}'`
      );
    } catch (error) {
      console.error("Failed to publish message:", error);
      // Handle errors that might necessitate reconnection
      if (this.channel && this.connection) {
        await this.closeConnection(); // Close on error if necessary
      }
    }
  }

  // Method to close connection and channel
  async closeConnection(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = undefined;
      }
      if (this.connection) {
        await this.connection.close();
        this.connection = undefined;
      }
      console.log(message.CONNECTION_CLOSED);
    } catch (error) {
      console.error(message.FAILED_TO_CLOSE_CONNECTION, error);
    }
  }
}

// Export the Producer class
export default Producer;
