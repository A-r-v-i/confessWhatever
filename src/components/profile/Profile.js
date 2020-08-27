import React, { useEffect, useState } from "react";
import LoginComponent from "../auth/Login";
import ProfileComponent from "./ProfileComponent";

export default function Profile({ isLoggedIn }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [user, setUser] = useState();
  console.log(isLoggedIn);
  useEffect(() => {
    isLoggedIn ? setLoggedIn(true) : setLoggedIn(() => false);
  }, [isLoggedIn]);
  const showProfile = (result) => {
    console.log(result);
    setLoggedIn(() => result);
  };
  const getUser = (user) => {
    console.log(user);
    setUser(() => user);
  };
  return (
    <div className="profileContainer">
      {!loggedIn ? (
        <LoginComponent showProfile={showProfile} getUser={getUser} />
      ) : (
        <ProfileComponent user={user} />
      )}
    </div>
  );
}
