import nodemailer, {
  Transporter,
  SendMailOptions,
  SentMessageInfo,
} from "nodemailer";
import { Mail_user,Mail_password } from "./dotenvVariables";



type MailSenderParams = {
  email: string;
  title: string;
  body: string;
};

const mailSender = async ({
  email,
  title,
  body,
}: MailSenderParams): Promise<SentMessageInfo> => {
  try {
    
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Mail_user,
        pass: Mail_password,
      },
    });

    
    const mailOptions: SendMailOptions = {
      from: "Prabhat Saini From binmile",
      to: email,
      subject: title,
      html: body,
      
    };

    // Send email
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in mailSender:", error.message);
    } else {
      console.error("Unexpected error in mailSender:", error);
    }
    throw new Error("Failed to send email");
  }
};

export default mailSender;
