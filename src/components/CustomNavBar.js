import React from "react";
import { Link } from "react-router-dom";

export default function CustomNavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        Merkinsio Login App
      </Link>
      <div>
        <Link to="/admin">
          <button class="btn btn-outline-success my-2 mr-3" type="submit">
            Admin
          </button>
        </Link>
        <Link to="/login">
          <button class="btn btn-primary my-2" type="submit">
            Login
          </button>
        </Link>
      </div>

      {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"></div> */}
    </nav>
  );
}
