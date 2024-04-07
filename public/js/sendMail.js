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
      name :'Coffee Outlet ☕',
      address: process.env.EMAIL
      },
      to: email,
      subject: 'Welcome to Coffee Outlet!🎉',
      text: 'Thank you for signing up..',
      html: `<h2>We are so excited you are here!</h2>
      <p>Inside the app you can find coffee shops in your area that are work-friendly.
      You can also <a href="#">earn points</a> towards your favorite cup by adding new shops or giving feedback!</p><br>
      <strong>Happy Coffee-ing! ☕</strong><br>
      <span>~Coffee Outlet Team~</span><br>`
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