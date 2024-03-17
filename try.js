// const data = [
//     {
//         mode: "a",
//         price: 2,
//     },
//     {
//         mode: "b",
//         price: 3,
//     },
//     {
//         mode: "a",
//         price: 4,
//     },
//     {
//         mode: "c",
//         price: 2,
//     },
//     {
//         mode: "b",
//         price: 3,
//     },
//     {
//         mode: "c",
//         price: 5,
//     }
// ]

// const obj = {
//     modea : {
//         total : 0,
//         per : 0
//     },
//     modeb : {
//         total : 0,
//         per : 0
//     },
//     modec : {
//         total : 0,
//         per : 0
//     }
// }

// console.log(obj);

// for (let i = 0; i < data.length; i++) {
//     if (data[i].mode === "a") {
//         obj.modea.total += data[i].price
//         obj.modea.per = ((obj.modea.total/19)*100)
//     }
//     if (data[i].mode === "b") {
//         obj.modeb.total += data[i].price
//         obj.modeb.per = ((obj.modeb.total/19)*100)
//     }
//     if (data[i].mode === "c") {
//         obj.modec.total += data[i].price
//         obj.modec.per = ((obj.modec.total/19)*100)
//     }
// }

// console.log("after",obj);

//     // const obj = [
//     //     {
//     //         mode: "a",
//     //         total: 0
//     //     },
//     //     {
//     //         mode: "b",
//     //         total: 0
//     //     },
//     //     {
//     //         mode: "c",
//     //         total: 0
//     //     }
//     // ]

const date = new Date()

console.log(`${date.getHours()}:${date.getMinutes()}`);

// app.post("/send", function (req, res) {
//     let mailOptions = {
//       from: `${req.body.vals.email}`,
//       to: process.env.EMAIL,
//       subject: 'SUBJECT INFO',
//       html: `${req.body.vals.date} ${req.body.vals.time} ${req.body.vals.info}`,
//     };
   
   
//     transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//         res.json({
//           status: "fail",
//         });
//       } else {
//         console.log("email sent");
//         res.json({
//           status: "success",
//         });
//       }
//     });
//    });