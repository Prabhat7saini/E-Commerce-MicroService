import amqp from "amqplib";
import { rabbitMQConfig } from "../../config/rabbitmqConfig";
import message from "../message";

type Message = string | object;

class Producer {
  private channel?: amqp.Channel;
  private connection?: amqp.Connection;

  private async connectToRabbitMQ(): Promise<void> {
    if (this.connection && this.channel) {
      return;
    }

    try {
      this.connection = await amqp.connect(rabbitMQConfig.url);
      this.channel = await this.connection.createChannel();
      console.log(message.rabbitmqMessages.CONNECTED_AND_CHANNEL_CREATED);
    } catch (error) {
      console.error(message.rabbitmqMessages.FAILED_TO_CONNECT, error);
      throw error;
    }
  }

  async publishMessage(routingKey: string, message: Message): Promise<void> {
    if (!this.channel || !this.connection) {
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
    } catch (error) {
      console.error("Failed to publish message:", error);
      await this.closeConnection();
    }
  }

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
      console.log(message.rabbitmqMessages.CONNECTION_CLOSED);
    } catch (error) {
      console.error(message.rabbitmqMessages.FAILED_TO_CLOSE_CONNECTION, error);
    }
  }
}

// Export the Producer class
export default Producer;
