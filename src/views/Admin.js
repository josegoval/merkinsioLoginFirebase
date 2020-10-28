// React
import React, { useEffect } from "react";
// Router
import { useHistory, useParams } from "react-router-dom";
// Firebase
import firebase from "../firebase/firebase-config";
// Components
import TableData from "../components/TableData";

export default function Admin() {
  let history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
    return () => unsuscribe();
  });

  return (
    <div className="container">
      <p className="px-5">Su token es: {token}</p>
      <TableData
        header={["id", "Nombre", "Apellido", "Sueldo"]}
        body={[
          ["3242", "María", "Perez", "1500"],
          ["1423", "José", "Valdivieso", "1500"],
        ]}
      />
    </div>
  );
  // comprobar si esta logeado - admin sino login
  // https://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
  // https://codepen.io/devstreak/pen/dMYgeO
}
