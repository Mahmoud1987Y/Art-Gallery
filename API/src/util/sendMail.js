require("dotenv").config();
const nodemailer = require("nodemailer");
const mailTemplate = require("./mailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.AUTH_USERNAME,
    pass: process.env.AUTH_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to, subject, html) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: process.env.AUTH_USERNAME, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line

      html: html, // html body
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = sendEmail;
