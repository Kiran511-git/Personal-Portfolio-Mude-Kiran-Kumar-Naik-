const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kirankumarnaik343@gmail.com', // Replace with your email
    pass: 'rqhk vssw oups zyor',    // Replace with your app password
  },
});

// ✅ Define POST route for sending email
app.post('/send', (req, res) => {
  const { name, email, subject, description } = req.body;

  const mailOptions = {
    from: email,
    to: 'kirankumarnaik343@gmail.com', // Replace with your email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nDescription:\n${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Failed to send email.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
