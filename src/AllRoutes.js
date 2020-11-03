// React
import React, { useEffect, useState } from "react";
// Router
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// Firebase
import firebase from "./firebase/firebase-config";
// Components
import UnloggedNavBar from "./components/NavBars/UnloggedNavBar";
import LoggedNavBar from "./components/NavBars/LoggedNavBar";
import Admin from "./views/Admin";
import CreateAccount from "./views/CreateAccount";
// import Home from "./views/Home";
import Login from "./views/Login";

function AllRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    });
    return () => unsuscribe();
  });

  return (
    <BrowserRouter>
      {/* Header */}
      {loggedIn ? <LoggedNavBar /> : <UnloggedNavBar />}
      {/* Switch */}
      <Switch>
        <Route path="/admin:token">
          <Admin loggedIn={loggedIn} />
        </Route>
        <Route path="/admin">
          <Admin loggedIn={loggedIn} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          {/* <Home /> */}
          {loggedIn ? <Redirect to="/admin" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default AllRoutes;
