import mailSender from "../utils/mainSender"; 
import {createEmailBody} from '../config/emailTemplate'


type SendMailForOtpParams = {
  email: string;
  emailBody:any
  title: string;
  
};

const sendMails = async ({
  email,
  emailBody,
  title,
  
}: SendMailForOtpParams): Promise<void> => {
  try {
    
    // const emailBody = createEmailBody({ orderId, paymentId, status });
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
