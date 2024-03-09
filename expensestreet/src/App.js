import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./component/welcome/Welcome";
import { Login } from "./component/Login"
import { Signup } from "./component/Signup";
import { Home } from "./component/Home";
import { ErrorPage } from "./component/ErrorPage";
import { useSelector } from "react-redux";
import { Navbar } from "./component/Navbar";
import { Profile } from "./component/profile/Profile";
import { Notification } from "./component/notification/Notification";

function App() {
  const state = useSelector((state) => state)
  console.log("Home state : ", state.LoginSliceReducer.isAuthenticated);

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
              <Route path="/notification" Component={Notification} />
              <Route path="*" Component={ErrorPage} />
            </Routes>
          </>
          : <Routes>
            <Route path="/" Component={Welcome} />
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={Signup} />
            <Route path="*" Component={Login} />
          </Routes>
      }
      {/* </Routes> */}
    </BrowserRouter>
  );
}

export default App;
