// var nodemailer = require('nodemailer');
const { App } = require('antd');
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rushikeshdurge7794@gmail.com',
        pass: 'ypha quso uppa knbz'
    }
});

var mailOptions = {
    from: 'ExpensStreet <rushikeshdurge7794@gmail.com>',
    to: "rushidurge27@gmail.com",
    subject: 'Sending Email using Node.js',
    // text: 'That was easy!'
    html:`
        <h1 className="text-center">ExpenseStreet</h1>
    `
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
