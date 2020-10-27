// REACT
import React, { useState } from "react";
// VIEWS
import Admin from "./Admin";
import Login from "./Login";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <Admin /> : <Login setLoggedIn={setLoggedIn} />;
}
