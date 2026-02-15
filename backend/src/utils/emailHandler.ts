import nodemailer from "nodemailer";

export async function SendVerificationEmail(
  to: string,
  subject: string,
  text: string,
  html?: any,
) {
  try {
    // Create a transporter object.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);

    //   Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.verify();
    console.log("SMTP server is ready to take messages");

    const emailPromise = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", emailPromise.response);
  } catch (error: any) {
    console.error("Error in sending email: ", error.message);
  }
}

export async function SendEmailForResetCredentials(
  to: string,
  subject: string,
  text?: string,
  html?: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const emailPromise = await transporter.sendMail(mailOptions);
    console.log("Email sent for reset credentials: ", emailPromise.response);
  } catch (error) {
    console.error("Error in sending email: ", error);
  }
}
