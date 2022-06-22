const nodemailer = require("nodemailer");

const sendEmail = async (name, email, subject, text, confirmationCode) => {
  let info = null;
  try {
    // Only needed if you don't have a real mail account for testing

    const transporter = nodemailer.createTransport({
      service: 'smtp',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      pool: true,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      // secure: true,
    });

    info = await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: email,
      subject: subject,
      text: text,
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for using our system. Please confirm your email by clicking on the following link</p>
        <a href=http://192.168.254.203:3001/v1/user/verify/${confirmationCode}> Click here</a>
        </div>`,
    });

  } catch (error) {
    info = error;
  }

  return info;
};

module.exports = sendEmail;
