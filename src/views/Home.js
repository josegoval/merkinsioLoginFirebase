// React
import React from "react";
// Views
import Admin from "./Admin";
import Login from "./Login";

export default function Home({ loggedIn }) {
  return loggedIn ? <Admin /> : <Login />;
}
