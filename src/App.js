import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/Header";
import MainContainer from "./components/dashboard/Main";
import Profile from "./components/profile/Profile";
import NotFound from "./components/error/notFound";

export default function App() {
  const alive = localStorage.getItem("id") ? true : false;

  const [loggedIn, setLoggedIn] = useState(alive);
  useEffect(() => {
    localStorage.getItem("id")
      ? setLoggedIn(() => true)
      : setLoggedIn(() => false);
      window.addEventListener('resize', ()=>{
        console.log(window.innerWidth)
      })
  }, [alive, loggedIn]);
  const authentication = () => {
    setLoggedIn(() => !loggedIn);
  };
  const handleLogin = (result) => {
    setLoggedIn(() => result);
  };
  return (
    <div>
      <Header authentication={authentication} isLoggedIn={loggedIn} />
      <Switch>
        <Route path="/" exact>
          <MainContainer authenticated={loggedIn} handleAuth={handleLogin} />
        </Route>
        <Route path="/user">
          <Profile isLoggedIn={loggedIn} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
