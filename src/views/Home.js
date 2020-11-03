// REACT
import React, { useState, useEffect } from "react";
// Firebase
import firebase from "../firebase/firebase-config";
// VIEWS
import Admin from "./Admin";
import Login from "./Login";

export default function Home() {
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

  return loggedIn ? <Admin /> : <Login />;
}
