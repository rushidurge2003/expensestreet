// import React from 'react'
// import axios from 'axios'
// import randn from 'randn'
// import { useState } from 'react'
// import { message } from 'antd'

// export const Forgetpassword = () => {
//   const [otp, setOtp] = useState(0)
//   const [username, setUsername] = useState("")
//   const [btnDisable, setBtnDisable] = useState(false)
//   const [userEnterOtp, setUserEnterOtp] = useState("")
//   const [otpMatch, setOtpMatch] = useState(false)
//   const [email, setEmail] = useState("")

//   const sendMailOtpFun = async (e) => {
//     e.preventDefault()
//     // await axios.post("http://localhost:9000/sendOtpMail", { "email": email, "otp": otp })
//     setOtp(randn(6))
//     // console.log("Email : ", email);
//     console.log("OTP : ", otp);
//   }

//   const generateOTP = async (e) => {
//     try {
//       e.preventDefault()
//       if (username === "") {
//         message.warning("Please enter username")
//       }
//       else {
//         // setOtp(randn(6))
//         const result = await axios.get("http://localhost:9000/userexist/" + username)
//         console.log("gtp Result : ",result);
//         if (result.data.exist) {
//           // const result1 = await axios.get("http://localhost:9000/getUserEmail/" + username)
//           // setEmail(result1.data.mail)
//           // console.log("Email : ", email);
//           console.log("OTP : ", otp);
//           // console.log("This is gotp");
//           setBtnDisable(true)

//           // setTimeout(cleanOtp,3000)
//           // sendMailOtpFun()
//         }
//         else {
//           message.error("User not exist")
//         }
//       }
//     } catch (error) {

//     }
//   }

//   const validateOtp = async (e) => {
//     e.preventDefault()
//     if (userEnterOtp === "") {
//       message.warning("Please enter OTP")
//     }
//     else if (userEnterOtp.length < 6) {
//       message.warning("Please enter 6 digit OTP")
//     }
//     else if (otp === userEnterOtp) {
//       message.success("OTP Match")
//       setOtpMatch(true)
//     }
//   }

//   return (
//     <>
//       <div style={{ position: "absolute", top: "10%", left: "30%" }}>
//         <div
//           style={{
//             width: "500px"
//           }}
//         >
//           <h2 className='text-center'>Set New Password</h2>
//           <form>
//             <div className='row'>
//               <label htmlForfor="exampleInputEmail1" className="form-label">Username</label>
//               <div className="mb-3 col-8">
//                 <input type="username" value={username} onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="exampleInputEmail1" />
//               </div>
//               <div className='col-4'>
//                 <button type="submit" disabled={btnDisable} className="btn btn-primary" onClick={generateOTP}>Generate OTP</button>
//               </div>
//             </div>
//             <h5>Email : {email}</h5>
//             <h5>OTP : {otp}</h5>
//             {
//               otp === 0 ?
//                 "" :
//                 <>
//                   <div className='row'>
//                     <label htmlForfor="exampleInputPassword1" className="form-label">Enter OTP</label>
//                     <div className="mb-3 col-8">
//                       {/* <br /> */}
//                       <input type="text" value={userEnterOtp} onChange={(e) => { setUserEnterOtp(e.target.value) }} maxLength={6} className="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div className='col-4'>
//                       <button type="submit" className="btn btn-primary" onClick={validateOtp}>Validate OTP</button>
//                     </div>
//                   </div>
//                 </>
//             }
//             {
//               otpMatch ?
//                 <>{email}</> : ""
//             }
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }


import React from 'react'
import { useState } from 'react'
const randn = require('randn')

export const Forgetpassword = () => {
  const [otp,setOtp] = useState(0)

  const getOtp = (e)=>{
    console.log("OTP 1 : ",otp);
    setOtp(randn(6))
    console.log("OTP 2 : ",otp);
  }

  return (
    <>
      <input type="button" value="Submit" onClick={getOtp} />
      <h5>OTP : {otp}</h5>
    </>
  )
}

