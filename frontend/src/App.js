import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/login/login.component";
import SignUpPage from "./pages/register/signup.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import UserDashboard from "./pages/udashboard/udashboard.component";
import EmployeePage from "./pages/employees/employees.component";
import QuarantinePage from "./pages/quarantine/quarantine.component";
import ReportPage from "./pages/creports/reports.component";
import ReportUser from "./pages/workspace/workspace.component";
import EditUserPage from "./pages/edituser/edituser.component";
import HomePage from "./pages/homepage/homepage.page";
import Loading from "./pages/loading/loading.js";
import UserProfile from "./pages/userProfile/UserProfile.js";
import Logs from "./pages/logs/logs.component";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LogInPage />} />
          <Route exact path="/register" element={<SignUpPage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/user-dashboard" element={<UserDashboard />} />
          <Route exact path="/corona-reports" element={<ReportPage />} />
          <Route exact path="/employee" element={<EmployeePage />} />
          <Route exact path="/quarantine" element={<QuarantinePage />} />
          <Route exact path="/logs" element={<Logs />} />
          <Route exact path="/report-user" element={<ReportUser />} />
          <Route exact path="/edit-user/:id" element={<EditUserPage />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/user/edit" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
