import React from "react";
import classes from "./dashboard.module.css";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const { id } = useParams();
  const getTitle = () => {
    switch (location.pathname) {
      case "/login":
        return "Login Page";
      case "/employee-list":
        return "Employee List";
      case "/create-employee":
        return "Create Employee";
      case `/edit-employee/${id}`:
        return "Employee Edit";
      default:
        return "Dashboard";
    }
  };
  return <div className={classes.dash}>{getTitle()}</div>;
}
