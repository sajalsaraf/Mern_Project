import React from "react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={classes.navbar}>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/employee-list">
        <div className={classes.emplist}>Employee List</div>
      </Link>
      <div className={classes.profile}>Hukum Gupta - Logout</div>
    </div>
  );
}
