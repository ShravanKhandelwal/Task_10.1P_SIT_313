const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public', { 'Content-Type': 'application/javascript' }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});



app.post('/subscribe', (req, res) => {
  const firstName = req.body.firstName 
  const lastName = req.body.lastName 
  const email = req.body.email

  var api_key = 'key-94dcfbe907b88417b880437d767c977e'; 
  var domain = 'sandboxf7fcc9e46a0c4ab3aa7d712c4c07a822.mailgun.org'; 
  var mg = mailgun({ apiKey: api_key, domain: domain });

  var data = {
    from: 'Excited User <aryannandal545@gmail.com>',
    to: email, 
    subject: 'Welcome to Deakin\'s Newsletter!',
    text: `Hello ${firstName} ${lastName},\n\nThank you for subscribing to Deakin's newsletter!\n\nBest regards,\nThe Deakin Team`
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', body);
      res.status(200).send('Email sent successfully');
    }
  });
});




app.listen(5080, function () {
  console.log("Server is running at port 5080");
});


