import mailSender from "../utils/mainSender"; // Update the import path as needed

// Define the type for the sendMailForOtp function parameters
type SendMailForOtpParams = {
  email: string;
  orderId: string;
};

const sendMails = async ({
  email,
  orderId,
}: SendMailForOtpParams): Promise<void> => {
  try {
    const mainResponse = await mailSender({
      email,
      title: "Verification Email",
      body: orderId,
    });
    console.log("Email sent successfully:", mainResponse.response);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to send OTP email:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default sendMails;
