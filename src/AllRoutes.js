// React
import React from "react";
// Router
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Components
import CustomNavBar from "./components/CustomNavBar";
import Admin from "./views/Admin";
import CreateAccount from "./views/CreateAccount";
import Home from "./views/Home";
import Login from "./views/Login";

function AllRoutes() {
  return (
    <BrowserRouter>
      {/* Header */}
      <CustomNavBar />
      {/* Switch */}
      <Switch>
        <Route path="/admin:token">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default AllRoutes;
