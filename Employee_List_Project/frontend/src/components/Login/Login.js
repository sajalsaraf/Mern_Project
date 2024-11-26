import React from "react";
import classes from "./login.module.css";

export default function Login() {
  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <div className={classes.title}>
          <label>Username:</label>
        </div>
        <div className={classes.input_holder}>
          <input />
        </div>
      </div>
      <div className={classes.form}>
        <div className={classes.title}>
          <label>Password:</label>
        </div>
        <div className={classes.input_holder}>
          <input />
        </div>
      </div>
      <div className={classes.button}>Login</div>
    </div>
  );
}
