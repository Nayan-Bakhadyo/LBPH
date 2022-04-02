import React, { useEffect } from "react";
import UniDashboardContent from "../../components/dashboardcon/dashboardcontent.component";
import { useDispatch, useSelector } from "react-redux";
import { logsUsers } from "../../redux/actions/userAction";
import "./logs.component.css";

export default function Logs() {
  const dispatch = useDispatch();

  const logList = useSelector((state) => state.logList);
  const { logs } = logList;
  console.log(logs);
  useEffect(() => {
    dispatch(logsUsers());
  }, [dispatch]);

  return (
    <UniDashboardContent>
      <h2 className="logs">Logs</h2>
      {logs &&
        logs.map((log) => (
          <div className="logs">
            <div className="logs__log">Log ID: {log._id}</div>
            <div className="logs__user">User ID: {log.user}</div>
            <div className="logs__time">Log Created Time: {log.createdAt}</div>
          </div>
        ))}
    </UniDashboardContent>
  );
}
