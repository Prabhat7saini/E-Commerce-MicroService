export const createEmailBody = ({
  orderId,
  paymentId,
  status,
}: {
  orderId?: string;
  paymentId?: string;
  status: string;
}): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 80%;
          margin: auto;
          padding: 20px;
          background-color: #f4f4f4;
          border-radius: 8px;
        }
        h1 {
          color: #5a5a5a;
        }
        p {
          font-size: 16px;
          margin: 10px 0;
        }
        .footer {
          margin-top: 20px;
          font-size: 14px;
          color: #777;
        }
        .highlight {
          color: #2a9d8f;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank You for Visiting Our Site!</h1>
        <p>We appreciate your business and want to make sure you have all the information you need.</p>
        <p>If you have placed an order with us, here are the details:</p>
        ${
          orderId
            ? `<p>Your order ID is <span class="highlight">${orderId}</span>.</p>`
            : ""
        }
        ${
          paymentId
            ? `<p>Your payment ID is <span class="highlight">${paymentId}</span>.</p>`
            : ""
        }
        <p>Your current order status is <span class="highlight">${status}</span>.</p>
        <div class="footer">
          <p>Thank you for choosing us!</p>
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
