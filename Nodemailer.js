// const express = require('express')
// const nodemailer = require('nodemailer')
// require('dotenv').config();

// //create reusable transporter object using SMTP  transport
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.USER,
//       pass: process.env.APP_PASSWORD
//     },
//     // debug: true // Enable debugging
//   });
//   console.log(transporter);
  
//   const mailOptions = {
//     from: {
//         name: 'RESET PASSWORD',
//         address: process.env.USER
//     },
//     //sender address
//     to: ['anigilajeridwanhorpeyemy@gmail.com', 'hammadabdwasii081@gmail.com'], //list of receivers  
//     subject: 'Sending Email using Node.js',
//     text: 'Anigilaje Testing reset password!',
//     html: "<b>Hello Weseee</b>"
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });