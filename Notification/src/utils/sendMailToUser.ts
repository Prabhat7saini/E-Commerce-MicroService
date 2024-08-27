import mailSender from "../utils/mainSender"; // Update the import path as needed

// Define the type for the sendMailForOtp function parameters
type SendMailForOtpParams = {
  email: string;
  orderId?: string;
  paymentId?: string; // Added paymentId parameter
  title: string;
  status: string;
};

const sendMails = async ({
  email,
  orderId,
  paymentId,
  title,
  status,
}: SendMailForOtpParams): Promise<void> => {
  try {
    // Construct the email body with orderId and paymentId
    let emailBody = "Thanks for coming to our site.";

    if (orderId) {
      emailBody += ` Your order ID is ${orderId}.`;
    }

    if (paymentId) {
      emailBody += ` Your payment ID is ${paymentId}.`;
    }
    emailBody += `and you  order status is ${status}`;
    const mainResponse = await mailSender({
      email,
      title,
      body: emailBody, // Use the constructed email body
    });

    console.log("Email sent successfully:", mainResponse.response);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to send email:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default sendMails;
