import React from "react";
import { Link } from "react-router-dom";

export default function UnloggedNavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        Merkinsio Login App
      </Link>
      <div>
        <Link to="/login">
          <button className="btn btn-primary my-2">Login</button>
        </Link>
      </div>

      {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"></div> */}
    </nav>
  );
}
