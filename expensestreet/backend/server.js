const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const multer = require("multer")
var nodemailer = require('nodemailer')


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

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "India@2003",
    database: "expensestreet",
    multipleStatements: true
})

if (conn) {
    console.log("Database Connected Successfully...!!")
}
else {
    console.log("Failed to Connect");
}

// 
//  Mail after Successfully SignUp
// 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rushikeshdurge7794@gmail.com',
        pass: 'ypha quso uppa knbz'
    }
});

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
        const { username, amount, date, description, payment_mode,category  } = req.body
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
        const { username, expId } = req.body;
        const sql = `DELETE FROM ${username}.expense WHERE expenseId=${expId}`;
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
        const { username, incId } = req.body;
        const sql = `DELETE FROM ${username}.income WHERE incomeId=${incId}`;
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