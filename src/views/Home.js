// REACT
import React, { useState, useEffect } from "react";
// VIEWS
import Admin from "./Admin";
import Login from "./Login";

export default function Home({ loggedIn }) {
  return loggedIn ? <Admin /> : <Login />;
}
