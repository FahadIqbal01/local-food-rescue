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
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //   Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const emailPromise = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", emailPromise.response);
  } catch (error) {
    console.error("Error in sending email: ", error);
  }
}
