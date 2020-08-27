import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import Axios from "axios";

import "../styles/login.css";

// const endPoint = "https://confession-api.herokuapp.com";
const endPoint = "http://localhost:5000";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Axios.post(endPoint + "/api/login", {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        let d = new Date(res.data.loggedOn);
        d.setHours(d.getHours() + 24);
        localStorage.setItem("time", d);

        props.showProfile(true);
        props.getUser(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async () => {
    await Axios.post(`${endPoint}/api/signup`, {
      username: username,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="formWrapper">
      <Grid container className="authWrapper">
        <Grid item sm={6} xs={12} className="formContainer">
          <Paper className="loginContainer">
            <form className="loginForm" action="POST" onSubmit={handleLogin}>
              <label>E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </Paper>
        </Grid>
        <Grid item sm={6} xs={12} className="formContainer">
          <Paper className="signUpContainer">
            <form className="signUpForm" action="POST" onSubmit={handleSignUp}>
              <label>Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label>E-Mail</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
              />
              <label>Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <button type="button" onClick={handleSignUp}>
                Create User
              </button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
