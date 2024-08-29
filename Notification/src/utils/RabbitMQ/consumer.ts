import amqp from "amqplib";
import { EventEmitter } from "events";
import { rabbitMQConfig } from "../../config/rabbitmqConfig";
import message from "../message";

class Consumer extends EventEmitter {
  private channel?: amqp.Channel;
  private connection?: amqp.Connection;


  async consumeMessages() {
    if (!this.connection || !this.channel) {
      this.connection = await amqp.connect(rabbitMQConfig.url);
      this.channel = await this.connection.createChannel();
      const exchangeName = rabbitMQConfig.exchangeName;
      const UserQueue = "userQueue";
      const orderQueue = "orderQueue";
      const paymentQueue = "paymentQueue";


      await this.channel.assertExchange(exchangeName, "direct", {
        durable: false,
      });

      const queue1 = await this.channel.assertQueue(UserQueue);
      const queue2 = await this.channel.assertQueue(orderQueue);
      const queue3 = await this.channel.assertQueue(paymentQueue)

      await this.channel.bindQueue(queue1.queue, exchangeName, "user");
      await this.channel.bindQueue(queue2.queue, exchangeName, "order");
      await this.channel.bindQueue(queue3.queue, exchangeName, "payment");

      this.channel?.consume(
        UserQueue,
        (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString());
            this.channel?.ack(message);


            this.emit("message1", data);
          }
        },
        { noAck: false }
      );
      this.channel?.consume(
        orderQueue,
        (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString());
            this.channel?.ack(message);


            this.emit("message2", data);
          }
        },
        { noAck: false }
      );
      this.channel?.consume(
        paymentQueue,
        (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString());
            this.channel?.ack(message);


            this.emit("message3", data);
          }
        },
        { noAck: false }
      );
      console.log('Waiting for messages...');
    }


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
