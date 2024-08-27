import amqp from "amqplib";
import { EventEmitter } from "events";
import { rabbitMQConfig } from "../../config/rabbitmqConfig";

class Consumer extends EventEmitter {
  private channel?: amqp.Channel;
  private connection?: amqp.Connection;

  async consumeMessages() {
    const exchangeName = rabbitMQConfig.exchangeName;
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(rabbitMQConfig.url);
      this.channel = await this.connection.createChannel();

      
      await this.channel.assertExchange(exchangeName, "direct", {
        durable: false,
      });
      const queue = await this.channel.assertQueue("paymentQueue");

      await this.channel.bindQueue(queue.queue, exchangeName, "info");
    }

    this.channel?.consume(
      "paymentQueue",
      (payment) => {
        if (payment) {
          const data = JSON.parse(payment.content.toString());
          //   console.log(data);
          this.channel?.ack(payment);

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
    console.log("Connection to RabbitMQ closed.");
  }
}

export default Consumer;
