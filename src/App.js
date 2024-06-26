import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./component/welcome/Welcome";
import { Login } from "./component/Login"
import { Signup } from "./component/Signup";
import { Home } from "./component/Home";
import { ErrorPage } from "./component/ErrorPage";
import { useSelector } from "react-redux";
import { Navbar } from "./component/Navbar";
import { Profile } from "./component/profile/Profile";
import { WelcomeNavbar } from "./component/welcome/WelcomeNavbar";
import { About } from "./component/welcome/About";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import { Feedback } from "./component/feedback/Feedback";
// import ExportToExcel from "./component/dataToexcel/ExportToExcel";

function App() {
  const state = useSelector((state) => state)

  return (
    <BrowserRouter>
      {
        localStorage.getItem("isAuthenticated") === "true"
          ?
          <>
            <Navbar />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/profile" Component={Profile} />
              <Route path="/feedback" Component={Feedback} />
              {/* <Route path="/excel" Component={ExportToExcel} /> */}
              <Route path="*" Component={ErrorPage} />
            </Routes>
          </>
          :
          <>
            <WelcomeNavbar />
            <Routes>
              <Route path="/" Component={Welcome} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
              <Route path="/about" Component={About} />
              <Route path="/forgetpassword" Component={ForgetPassword} />
              <Route path="*" Component={Login} />
            </Routes>
          </>
      }
      {/* </Routes> */}
    </BrowserRouter>
  );
}

export default App;
