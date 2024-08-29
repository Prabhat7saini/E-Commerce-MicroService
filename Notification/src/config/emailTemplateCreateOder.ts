

export const createOrderConfirmationEmailBody = ({
    orderId,
    items,
    totalAmount
}: {
    orderId: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: string; // Change to string as it's being passed as a string
}): string => {
    // Helper function to format currency
    const formatCurrency = (amount: number): string => {
        return `$${amount.toFixed(2)}`;
    };

    // Convert totalAmount to a number
    const totalAmountNumber = parseFloat(totalAmount);

    // Generate the items list HTML
    const itemsHtml = items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.quantity * item.price)}</td>
    </tr>
  `).join('');

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
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        .highlight {
          color: #2a9d8f;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          font-size: 14px;
          color: #777;
        }
        .total {
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Order Created Successfully!</h1>
        <p>Thank you for your purchase. Your order has been created successfully.</p>
        <p>Your order ID is <span class="highlight">${orderId}</span>.</p>
        <p>Here are the details of your order:</p>
        
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        
        <p class="total">Total Amount: <span class="highlight">${formatCurrency(totalAmountNumber)}</span></p>
        
        <div class="footer">
          <p>If you have any questions about your order, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
