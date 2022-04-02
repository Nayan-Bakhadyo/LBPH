import React from "react";
import UniDashboardContent from "../../components/dashboardcon/dashboardcontent.component";
import "./udashboard.component.css";
import { useSelector } from "react-redux";

export default function UserDashboard() {
  const userDetail = useSelector((state) => state.userLogin);
  const { userInfo } = userDetail;
  return (
    <UniDashboardContent>
      <div className="viewuser">
        <div className="userinfo">
          <h3>User Details</h3>
          <div className="user-item">Name: {userInfo.name}</div>
          <div className="user-item">Email: {userInfo.email}</div>
          <div className="user-item">Age: {userInfo.age}</div>
          <div className="user-item">Sex: {userInfo.sex}</div>
        </div>
      </div>
    </UniDashboardContent>
  );
}
