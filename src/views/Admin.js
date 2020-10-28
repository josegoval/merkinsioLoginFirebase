// React
import React from "react";
// Router
import { useParams } from "react-router-dom";

export default function Admin() {
  const { token } = useParams();
  return (
    <div className="container">
      <p className="px-5">Su token es {token}</p>
    </div>
  );
  // comprobar si esta logeado - admin sino login
  // https://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
}
