// React
import React from "react";
// Router
import { Link } from "react-router-dom";
// Firebase
import { logOut } from "../../firebase/firebaseLoginAndCreateFunctions";

export default function LoggedNavBar() {
  const logOutFromFirebase = () => {
    if (logOut()) {
      console.log("Se cerro la sesión.");
      return;
    }
    console.log("Hubo algun error.");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        Merkinsio Login App
      </Link>
      <div>
        <Link to="/cards">
          <button className="btn btn-outline-info my-2 mr-3">Cards</button>
        </Link>
        <Link to="/admin">
          <button className="btn btn-outline-primary my-2 mr-3">Admin</button>
        </Link>
        <Link to="/login" onClick={logOutFromFirebase}>
          <button className="btn btn-danger my-2">Log out</button>
        </Link>
      </div>

      {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"></div> */}
    </nav>
  );
}
