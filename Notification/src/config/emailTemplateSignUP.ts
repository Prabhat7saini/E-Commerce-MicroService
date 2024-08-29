export const createWelcomeEmailBody = ({
    userName,
}: {
    userName: string;
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
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #007bff;
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
        <h1>Welcome to Our Site, ${userName}!</h1>
        <p>Thank you for creating an account with us. We're excited to have you on board!</p>
        <p>Here are a few things you can do next:</p>
        <ul>
          <li><a href="https://www.example.com/dashboard">Visit your dashboard</a></li>
          <li><a href="https://www.example.com/support">Get support</a></li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team at support@example.com.</p>
        <div class="footer">
          <p>Thank you for choosing us!</p>
          <p>&copy; 2024 E-Commerce_microServices. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
