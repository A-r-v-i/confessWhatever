import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { ExitToAppRounded, PersonRounded } from "@material-ui/icons";
import "../styles/header.css";

export default function Header({ authentication, isLoggedIn }) {
  console.log(isLoggedIn);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  useEffect(() => {
    setLoggedIn(() => isLoggedIn);
  }, [isLoggedIn, loggedIn]);
  const handleLogout = () => {
    setLoggedIn(() => false);
    localStorage.clear();
    console.log(loggedIn);
    authentication();
  };
  return (
    <div className="navbarWrapper">
      <AppBar id="navbarContainer" position="static">
        <Toolbar id="navbar">
          <Link id="mainLogo" to="/">
            <Typography variant="h6">ConfessTime</Typography>
          </Link>
          <div>
            <Link to="/user">
              <IconButton>
                <PersonRounded />
              </IconButton>
            </Link>
            {loggedIn ? (
              <IconButton onClick={handleLogout}>
                <ExitToAppRounded />
              </IconButton>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
