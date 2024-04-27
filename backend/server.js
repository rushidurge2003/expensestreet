const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const multer = require("multer")
var nodemailer = require('nodemailer')
// const cron = require('node-cron')\


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.listen(9000, () => console.log("server started on port 9000"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
        console.log("Req : ", req);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Mysql Connection
const conn = mysql.createConnection({
    host: "mydb.cbsyuiukeu5i.eu-north-1.rds.amazonaws.com",
    user: "admin",
    password: "India2003",
    database: "expensestreet",
    multipleStatements: true,
    timezone: "Z"
})

// local host connection
// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "India@2003",
//     database: "expensestreet",
//     multipleStatements: true,
//     timezone: "Z"
// })

if (conn) {
    console.log("Database Connected Successfully...!!")
}
else {
    console.log("Failed to Connect");
}

// gmail connection
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rushikeshdurge7794@gmail.com',
        pass: 'ypha quso uppa knbz'
    }
});

// =============================
//  Mail after Successfully SignUp
// =============================


app.post("/sendMail", (req, res) => {

    const { email } = req.body
    const mailOptions = {
        from: 'ExpensStreet <rushikeshdurge7794@gmail.com>',
        to: `${email}`,
        subject: 'Successfully Sign Up',
        // text: 'That was easy!',
        html: `
            <h1>ExpenseStreet</h1>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('\tEmail sent: ' + info.response);
        }
    });
})

// =====================

// ======================
// 
//  Forget Password
//  
// =======================

app.get("/getUserEmail/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = "select * from user where username=?"
        conn.query(sql, [username], (err, result) => {
            if (err) {
                res.send(err)
            } else {
                if (result.length > 0) {
                    res.send({ mail: result[0].email })
                }
            }
        })
    } catch (error) {

    }
})

app.post("/sendOtpMail", (req, res) => {

    const { email, otp } = req.body
    const mailOptions = {
        from: 'ExpensStreet <rushikeshdurge7794@gmail.com>',
        to: `${email}`,
        subject: 'Reset Password OTP',
        // text: 'That was easy!',
        html: `
            <h1>ExpenseStreet</h1>
            <p>OTP : ${otp}</p>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('\tEmail sent: ' + info.response);
        }
    });
})

app.post("/resetPassword", (req, res) => {
    try {
        const { password, username } = req.body
        const sql = `UPDATE user SET password="${password}" where username="${username}"`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
                console.log("\tPassword Reset Successfully");
            }
        })
    } catch (error) {

    }
})

// ========================
// 
//  Send Reminder Email
// 
// ========================

app.post("/sendReminderEmail", function (req, res) {
    const { username, id, email, date, time } = req.body
    let mailOptions = {
        from: 'ExpensStreet <rushikeshdurge7794@gmail.com>',
        to: `${email}`,
        subject: 'Reminder',
        // html: `${req.body.vals.date} ${req.body.vals.time} ${req.body.vals.info}`,
    };

    const dateParsed = new Date(`${date}T${time}Z`)

    schedule.scheduleJob(dateParsed, function () {
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                res.json({
                    status: "fail",
                });
            } else {
                console.log("email sent");
                // res.json({
                //     status: "success",
                // });
                try {
                    const sql = `UPDATE ${username}.reminder SET reminderComplete="true" WHERE reminderId=${id}`
                    conn.query(sql, (err1, result) => {
                        if (err) {
                            res.send(err1)
                        } else {
                            console.log("Message agter mail sent");
                            res.send(result)
                        }
                    })
                } catch (error) {

                }
            }
        });
    })
});

// ========================
// 
// Feedback
// 
// ========================

app.post("/feedback", (req, res) => {
    try {
        const { username, email, subject, fback, date } = req.body
        const sql = `INSERT INTO feedback(username,email, subject, fback, date) VALUES("${username}","${email}","${subject}","${fback}","${date}")`
        conn.query(sql,(err,result)=>{
            if (err) {
                res.send(err)
                console.log("\tError in submit feedback");
            } else {
                res.send(result)
                console.log("\tFeedback Submit Successfully");
            }
        })
    } catch (error) {

    }
})


// =========================
// 
// 
//     Login & Signup      
// 
// 
// =========================


app.post("/signup", (req, res) => {
    try {
        const { name, username, password, email, contact } = req.body
        console.log("Server Data : ", req.body);
        const sql = `insert into user(name, username, password, email,contact) values("${name}","${username}","${password}","${email}","${contact}")`
        conn.query(sql, (err, result) => {
            if (err) {

            }
            else {
                // res.send(result)
                res.send(result)
                console.log("\tUser Data Add Successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/userexist/:username", (req, res) => {
    const username = req.params.username
    const sql = "select * from user where username=?"
    conn.query(sql, [username], (err, result) => {
        if (err) {
            res.send(err)
        } else {
            if (result.length > 0) {
                res.send({ exist: true })
                console.log("\t" + username + " User exist");
            }
            else {
                res.send({ exist: false })
                console.log("\t" + username + " doesn't exist");
            }
        }
    })
})

app.post("/creatDataBase", (req, res) => {
    const { name, email, username, contact } = req.body
    const sql = `create database ${username};

    CREATE TABLE ${username}.userprofile (
    userId INT NOT NULL AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    email VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL,
    contact BIGINT,
    notification INT NOT NULL,
    PRIMARY KEY (userId));

    insert into ${username}.userprofile(name,email,username,contact,notification) values("${name}","${email}","${username}","${contact}",0);

    CREATE TABLE ${username}.expense (
        expenseId INT NOT NULL AUTO_INCREMENT,
        amount VARCHAR(45) NOT NULL,
        date DATETIME NOT NULL,
        description VARCHAR(45) NOT NULL,
        payment_mode VARCHAR(45) NOT NULL,
        category VARCHAR(45) NOT NULL,
        type VARCHAR(45) NOT NULL DEFAULT 'expense',
        PRIMARY KEY (expenseId));

    CREATE TABLE ${username}.income (
        incomeId INT NOT NULL AUTO_INCREMENT,
        amount VARCHAR(45) NOT NULL,
        description VARCHAR(45) NOT NULL,
        type VARCHAR(45) NOT NULL DEFAULT 'income',
        date DATETIME NOT NULL,
        PRIMARY KEY (incomeId));

    CREATE TABLE ${username}.deleteTransaction (
        deletePermantID INT NOT NULL AUTO_INCREMENT,
        deleteId INT NOT NULL,
        amount VARCHAR(45) NOT NULL,
        date DATETIME NOT NULL,
        description VARCHAR(45) NOT NULL,
        payment_mode VARCHAR(45),
        category VARCHAR(45),
        type VARCHAR(45) NOT NULL,
        PRIMARY KEY (deletePermantID));

    CREATE TABLE ${username}.reminder (
        reminderId INT NOT NULL AUTO_INCREMENT,
        reminderDesc VARCHAR(100) NOT NULL,
        reminderDateTime DATETIME NOT NULL,
        reminderComplete VARCHAR(10) NOT NULL,
        amount VARCHAR(45) NOT NULL,
        type VARCHAR(45) NOT NULL,
        PRIMARY KEY (reminderId));

    CREATE TABLE ${username}.notification (
        notificationId INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(45) NOT NULL,
        description VARCHAR(100) NOT NULL,
        type VARCHAR(45) NOT NULL,
        amount VARCHAR(45) NOT NULL,
        date DATETIME NOT NULL,
        active VARCHAR(10) NOT NULL,
        PRIMARY KEY (notificationId));

    CREATE TABLE ${username}.stockmarket (
        smid INT NOT NULL AUTO_INCREMENT,
        smdate DATETIME NOT NULL,
        smname VARCHAR(45) NOT NULL,
        price DECIMAL(8,2) NULL,
        quantity INT NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        PRIMARY KEY (smid));

    CREATE TABLE ${username}.mutualfund (
        mfid INT NOT NULL AUTO_INCREMENT,
        mfdate DATETIME NOT NULL,
        mfname VARCHAR(45) NOT NULL,
        amount INT NOT NULL,
        PRIMARY KEY (mfid));

    CREATE TABLE ${username}.fixeddeposit (
        fid INT NOT NULL AUTO_INCREMENT,
        fdate DATETIME NOT NULL,
        bankname VARCHAR(45) NOT NULL,
        amount INT NOT NULL,
        PRIMARY KEY (fid));

    CREATE TABLE ${username}.realestate (
        rid INT NOT NULL AUTO_INCREMENT,
        rdate DATETIME NOT NULL,
        rname VARCHAR(45) NOT NULL,
        amount INT NOT NULL,
        PRIMARY KEY (rid));
          
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
            console.log("\tCreate Database Successfully");
        }
    })
})

app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body
        console.log("\t\t\Login Data : ", req.body);
        const sql = `select * from user where username="${username}"and password="${password}"`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                if (result.length > 0) {
                    res.json({
                        "isAuthenticated": true,
                        "username": username,
                        "result": result,
                    })
                    console.log("\tLogin Successfully....");
                }
                else {
                    res.json({
                        "isAuthenticated": false,
                        "result": result
                    })
                    console.log("\tFailed to Login");
                }
            }
        })
    } catch (error) {

    }
})

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        const { filename, path } = req.file;
        console.log("Path : ", path);
        console.log("Filename : ", filename);
    } catch (error) {

    }

    // Save image metadata to MySQL
    // const sql = 'INSERT INTO images (filename, path) VALUES (?, ?)';
    // connection.query(sql, [filename, path], (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Internal server error' });
    //   } else {
    //     res.json({ message: 'Image uploaded successfully' });
    //   }
    // });
});


// =========================
//
//
//       After Login
//  get userProfile Details
//  add Expenses, get Expenses, update Expenses, delete Expenses
//  add Income, get Income, update Income, delete Income
//
//
// =========================


app.get("/userprofile/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `select * from ${username}.userprofile`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.json(result)
                console.log("\tUserProfile data get successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/addExpense", (req, res) => {
    try {
        const { username, amount, date, description, payment_mode, category } = req.body
        const sql = `insert into ${username}.expense(amount,date,description,payment_mode,category) values(${amount},"${date}","${description}","${payment_mode}","${category}")`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {

    }
})

app.get("/getAllExpense/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `select * from ${username}.expense`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.json(result)
                console.log("\tAll Expense get Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/updateExpense", (req, res) => {
    try {
        const { username, expId, amount, date, description, payment_mode, category } = req.body
        const sql = `UPDATE ${username}.expense set amount=${amount},date="${date}",description="${description}",payment_mode="${payment_mode}",category="${category}" where expenseId=${expId}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in Update Expense");
            }
            else {
                res.send(result)
                console.log("\tExpense Update Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteExpense", (req, res) => {
    try {
        const { username, expId, amount, date, description, payment_mode, category, type } = req.body;
        const sql = `DELETE FROM ${username}.expense WHERE expenseId=${expId}; 
                    insert into ${username}.deleteTransaction(deleteId,amount,date,description,payment_mode,category,type) values(${expId},${amount},"${date}","${description}","${payment_mode}","${category}","${type}") 
                    `;
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in Delete Expense");
                console.log("\t\t", username);
                console.log("\t\t", expId);
            }
            else {
                res.send(result)
                console.log("\tDelete expense Successfully");
                console.log("\t\t", username);
                console.log("\t\t", expId);
            }
        })
    } catch (error) {

    }
})

app.post("/addIncome", (req, res) => {
    try {
        const { username, amount, date, description } = req.body
        const sql = `insert into ${username}.income(amount,date,description) values(${amount},"${date}","${description}")`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {

    }
})

app.get("/getAllIncome/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `select * from ${username}.income`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.json(result)
                console.log("\tAll Income get Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/updateIncome", (req, res) => {
    try {
        const { username, incId, amount, date, description } = req.body
        const sql = `UPDATE ${username}.income set amount=${amount},date="${date}",description="${description}" where incomeId=${incId}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in Update Income");
            }
            else {
                res.send(result)
                console.log("\tExpense Update Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteIncome", (req, res) => {
    try {
        const { username, incId, amount, date, description, type } = req.body;
        const sql = `DELETE FROM ${username}.income WHERE incomeId=${incId};
        insert into ${username}.deleteTransaction(deleteId,amount,date,description,type) values(${incId},${amount},"${date}","${description}","${type}")
        `;
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in Delete Expense");
                // console.log("Username : ",username);
                // console.log("Username : ",incId);
            }
            else {
                res.send(result)
                console.log("\tDelete expense Successfully");
            }
        })
    } catch (error) {

    }
})

// =================
// 
// Deleted All Transaction Data
// 
// =================

app.get("/getdeleteTransData/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.deletetransaction`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
            }
        })
    } catch (error) {

    }
})

app.post("/deleteDeletedTrans", (req, res) => {
    try {
        const { username, delId } = req.body
        const sql = `DELETE FROM ${username}.deletetransaction WHERE deletePermantID = ${delId}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    } catch (error) {

    }
})

app.post("/deletRestoreExpense", (req, res) => {
    try {
        const { username, expId, amount, date, description, payment_mode, category } = req.body
        const sql = `insert into ${username}.expense(expenseId,amount,date,description,payment_mode,category) values(${expId},${amount},"${date}","${description}","${payment_mode}","${category}")`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError expense restore");
            }
            else {
                res.send(result)
                console.log("\tSuccess expense restore");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteRestoreIncome", (req, res) => {
    try {
        const { username, incId, amount, date, description } = req.body
        const sql = `insert into ${username}.income(incomeId,amount,date,description) values(${incId},${amount},"${date}","${description}")`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError income restore");
            }
            else {
                res.send(result)
                console.log("\tSuccess income restore");
            }
        })
    } catch (error) {

    }
})


// ================
// 
//  Reminder 
// 
// ================

app.post("/addReminder", (req, res) => {
    try {
        const { username, desc, datetime, amount, type } = req.body
        const sql = `INSERT INTO ${username}.reminder(reminderDesc, reminderDateTime, amount,reminderComplete,type) values("${desc}", "${datetime}", "${amount}", "false", "${type}")`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("Error in add Reminder");
            } else {
                res.send(result)
                console.log("\tReminder add successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getReminderData/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.reminder`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(result)
                console.log("\tAll reminder data get successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getSingleReminderData/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `select * from ${username}.reminder ORDER BY reminderId DESC LIMIT 1`;
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError Last Reminder Sent");
            }
            else {
                res.send(result)
                console.log("\tLast Reminder Sent Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteReminder", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `DELETE FROM ${username}.reminder WHERE reminderId = ${id}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("Error in delete Reminder");
            } else {
                res.send(result)
                console.log("\tReminder delete successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/statusTrueReminder", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `UPDATE ${username}.reminder SET reminderComplete="true" WHERE reminderId = ${id}`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("Error in Status True Reminder");
            } else {
                res.send(result)
                console.log("\tReminder True successfully");
            }
        })
    } catch (error) {

    }
})

// ===================
// 
//  Notification
// 
// ===================

app.get("/getNotification/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.notification;`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
                console.log("\tNotification data get successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getNotificationCount/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT COUNT(notificationId) AS notificationCount FROM ${username}.notification where active="true"`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
                console.log("\tNotification Count get successfully");
            }
        })
    } catch (error) {

    }
})

// =====================
// 
//  Investment
// 
// =====================

// 1) Stock Investment
app.post("/addStockInvest", (req, res) => {
    try {
        const { username, date, name, price, quantitiy, total } = req.body
        const sql = `INSERT INTO ${username}.stockmarket (smdate,smname, price, quantity,total) VALUES("${date}","${name}",${price},${quantitiy},${total})`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in add stock market investment");
            } else {
                res.send(result)
                console.log("\tStock market investment add successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getStockInvest/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.stockmarket`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                console.log("\tGet Stock Investment Successfullt");
            }
        })
    } catch (error) {

    }
})

app.post("/updateStockInvest", (req, res) => {
    try {
        const { username, id, date, name, price, quantity, total } = req.body
        const sql = `UPDATE ${username}.stockmarket SET smdate = "${date}",smname = "${name}",price = ${price},quantity = ${quantity},total = ${total} WHERE smid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in update stock market investment");
            } else {
                res.send(result)
                console.log("\tStock market investment update successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteStockInvest", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `DELETE FROM ${username}.stockmarket where smid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in delete stock market investment");
            } else {
                res.send(result)
                console.log("\tStock market investment delete successfully");
            }
        })
    } catch (error) {

    }
})


// 2) Mutual Fund Investment
app.post("/addMutualFundInvest", (req, res) => {
    try {
        const { username, date, name, amount } = req.body
        const sql = `INSERT INTO ${username}.mutualfund (mfdate,mfname,amount) VALUES("${date}","${name}",${amount})`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in add Mutual Fund investment");
            } else {
                res.send(result)
                console.log("\tMutual Fund investment add successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getMutualFundInvest/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.mutualfund`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                console.log("Get Mutual Fund Investment Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/updateMutualFundInvest", (req, res) => {
    try {
        const { username, id, date, name, amount } = req.body
        const sql = `UPDATE ${username}.mutualfund SET mfdate = "${date}",mfname = "${name}",amount = ${amount} WHERE mfid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in update mutula fund investment");
            } else {
                res.send(result)
                console.log("\tMutula fund investment update successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteMutualFundInvest", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `DELETE FROM ${username}.mutualfund where mfid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in delete mutula fund investment");
            } else {
                res.send(result)
                console.log("\tMutula fund investment delete successfully");
            }
        })
    } catch (error) {

    }
})



// 3) Real Estate
app.post("/addRealEstateInvest", (req, res) => {
    try {
        const { username, date, name, amount } = req.body
        const sql = `INSERT INTO ${username}.realestate (rdate,rname,amount) VALUES("${date}","${name}",${amount})`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in add Real Estate investment");
            } else {
                res.send(result)
                console.log("\tReal Estate investment add successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getRealEstateInvest/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.realestate`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                console.log("Get Real Estate Investment Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/updateRealEstateInvest", (req, res) => {
    try {
        const { username, id, date, name, amount } = req.body
        const sql = `UPDATE ${username}.realestate SET rdate = "${date}",rname = "${name}",amount = ${amount} WHERE rid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in update real estate investment");
            } else {
                res.send(result)
                console.log("\tReal estate investment update successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteRealEstateInvest", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `DELETE FROM ${username}.realestate where rid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in delete real estate investment");
            } else {
                res.send(result)
                console.log("\tReal estate investment delete successfully");
            }
        })
    } catch (error) {

    }
})

// Fixed Deposite
app.post("/addFixedDepositInvest", (req, res) => {
    try {
        const { username, date, name, amount } = req.body
        const sql = `INSERT INTO ${username}.fixeddeposit (fdate,bankname,amount) VALUES("${date}","${name}",${amount})`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in add Fixed Deposit investment");
            } else {
                res.send(result)
                console.log("\tFixed Deposit investment add successfully");
            }
        })
    } catch (error) {

    }
})

app.get("/getFixedDepositInvest/:username", (req, res) => {
    try {
        const username = req.params.username
        const sql = `SELECT * FROM ${username}.fixeddeposit`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.json(result)
                console.log("Get Fixed Deposit Investment Successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/updateFixedDepositInvest", (req, res) => {
    try {
        const { username, id, date, name, amount } = req.body
        const sql = `UPDATE ${username}.fixeddeposit SET fdate = "${date}",bankname = "${name}",amount = ${amount} WHERE fid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in update fixed deposit investment");
            } else {
                res.send(result)
                console.log("\tFixed deposit investment update successfully");
            }
        })
    } catch (error) {

    }
})

app.post("/deleteFixedDepositInvest", (req, res) => {
    try {
        const { username, id } = req.body
        const sql = `DELETE FROM ${username}.fixeddeposit where fid = ${id};`
        conn.query(sql, (err, result) => {
            if (err) {
                res.send(err)
                console.log("\tError in delete fixed deposit investment");
            } else {
                res.send(result)
                console.log("\tFixed deposit investment delete successfully");
            }
        })
    } catch (error) {

    }
})