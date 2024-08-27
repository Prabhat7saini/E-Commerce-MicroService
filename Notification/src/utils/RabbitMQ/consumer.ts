import amqp from "amqplib";
import { EventEmitter } from "events";
import { rabbitMQConfig } from "../../config/rabbitmqConfig";
import message from "../message";

class Consumer extends EventEmitter {
  private channel?: amqp.Channel;
  private connection?: amqp.Connection;


  async consumeMessages(queueName: string, exchangeName: string) {
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(rabbitMQConfig.url);
      this.channel = await this.connection.createChannel();

      // Ensure the properties match with the existing exchange
      await this.channel.assertExchange(exchangeName, "direct", {
        durable: false,
      });

      const queue = await this.channel.assertQueue(queueName);

      await this.channel.bindQueue(queue.queue, exchangeName, "info");
    }

    this.channel?.consume(
      queueName,
      (message) => {
        if (message) {
          const data = JSON.parse(message.content.toString());
          this.channel?.ack(message);

          // Emit an event when a message is received
          this.emit("message", data);
        }
      },
      { noAck: false }
    );
  }

  async closeConnection(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = undefined;
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = undefined;
    }
    console.log(message.rabbitmqMessages.CONNECTION_CLOSED);
  }
}

export default Consumer;
