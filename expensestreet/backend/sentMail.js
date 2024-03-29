const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
// const cron = require('node-cron')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.listen(9001, () => console.log("server started on port 9001"))

const date = new Date()

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "India@2003",
    database: "expensestreet",
    multipleStatements: true,
    timezone: "Z"
})

if (conn) {
    console.log("Database Connected Successfully...!!")
}
else {
    console.log("Failed to Connect");
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rushikeshdurge7794@gmail.com',
        pass: 'ypha quso uppa knbz'
    }
});

setInterval(() => {
    console.log("\t\tInterval hit");
    const sql = "select * from user"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            result.forEach(element => {
                const username = element.username;
                const email = element.email

                const remSql = `SELECT * FROM ${username}.reminder WHERE reminderDateTime <= NOW() and reminderComplete="false";`
                conn.query(remSql, (remErr, remResult) => {
                    if (remErr) {
                        console.log(remErr);
                    } else {
                        remResult.forEach(x => {
                            let mailOptions = {
                                from: 'ExpenseStreet <rushikeshdurge7794@gmail.com>',
                                to: `${email}`,
                                subject: 'Reminder',
                                // html: `${req.body.vals.date} ${req.body.vals.time} ${req.body.vals.info}`,
                            };

                            transporter.sendMail(mailOptions, function (mailerr, data) {
                                if (err) {
                                    console.log(mailerr);
                                } else {
                                    console.log("email sent");
                                    try {
                                        const d = JSON.stringify(x.reminderDateTime)
                                        const da = (d).slice(1, 20).replace("T", ' ');
                                        const sql = `INSERT INTO ${username}.notification(title, description, type, amount, date, active) VALUES('REMINDER', "${x.reminderDesc}", "${x.type}", "${x.amount}", "${da}", 'true');
                                                    UPDATE ${username}.reminder SET reminderComplete="true" WHERE reminderId=${x.reminderId}`
                                        conn.query(sql, (err1, result1) => {
                                            if (err1) {
                                                console.log(err1);
                                            } else {
                                                console.log("Add notification successfully");
                                                
                                            }
                                        })
                                    } catch (error) {

                                    }
                                }
                            });
                        });
                    }
                })
            });
        }
    })
}, 30000)