import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginInPage from './pages/login/login.component';
// import SignUpPage from './pages/register/signup.component';
// import Dashboard from './pages/dashboard/dashboard.component';
// import UserDashboard from './pages/udashboard/udashboard.component';
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          {/* <Route exact path='/dashboard' element={<Dashboard/>} />
      <Route exact path='/user-dashboard' element={<UserDashboard/>} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
