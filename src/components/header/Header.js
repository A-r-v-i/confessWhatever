import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { ExitToAppRounded } from "@material-ui/icons";
import "../styles/header.css";

export default function Header({ authentication }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const handlelogin = () => {
    setLoggedIn(() => true);
    console.log(loggedIn);
    authentication(false);
  };
  return (
    <div className="navbarWrapper">
      <AppBar id="navbarContainer" position="static">
        <Toolbar id="navbar">
          <Typography variant="h6">ConfessTime</Typography>
          <IconButton onClick={handlelogin}>
            <ExitToAppRounded />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
