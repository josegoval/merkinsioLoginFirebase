// React
import React, { useEffect } from "react";
// Router
import { useHistory, useParams } from "react-router-dom";
// Components
import TableData from "../components/AdminTable/TableData";

export default function Admin({ loggedIn }) {
  let history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    }
  }, [loggedIn]);

  return (
    <div className="container">
      {/* <p className="px-5">Su token es: {token}</p> */}
      <TableData />
    </div>
  );
  // comprobar si esta logeado - admin sino login
  // https://stackoverflow.com/questions/38038343/how-to-remove-the-new-firebase-onauthstatechanged-listener-in-react
  // https://codepen.io/devstreak/pen/dMYgeO
}
