const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

// Function to send welcome email
const sendSignUpEmail = async (email) => {
    const mailOptions = {
        from: {
            name :'Coffee-Outlet ☕',
            address: process.env.EMAIL
        },
        to: email,
        subject: 'Welcome to Coffe-Outlet App!',
        text: 'Thank you for signing up, We are so excited You are here!'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Error sending signup email:', error);
        } else {
          console.log('Signup email sent:', info.response);
        }
      });
    };


module.exports =  { sendSignUpEmail };