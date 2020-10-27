// React
import React, { useState } from "react";
// Router
import { Link, useHistory } from "react-router-dom";
// Utils
import {
  isNullOrEmpty,
  boostrapIsInvalidInputSytle,
} from "../utils/inputUtilities";

function Login({ setLoggedIn }) {
  let history = useHistory();
  const [isEmailInvalid, setIsEmailInvalid] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  //   INPUT HANDLERS
  const handleEmailInput = (e) => {
    setEmailInput(e.target.value);
    setIsEmailInvalid(
      boostrapIsInvalidInputSytle(isNullOrEmpty(e.target.value))
    );
  };
  const handlePasswordInput = (e) => {
    setPasswordInput(e.target.value);
    setIsPasswordInvalid(
      boostrapIsInvalidInputSytle(isNullOrEmpty(e.target.value))
    );
  };

  //   SUBMIT HANDLER
  const handleSubmit = () => {
    const emailInvalid = isNullOrEmpty(emailInput);
    const passwordInvalid = isNullOrEmpty(passwordInput);

    setIsEmailInvalid(boostrapIsInvalidInputSytle(emailInvalid));
    setIsPasswordInvalid(boostrapIsInvalidInputSytle(passwordInvalid));

    if (!emailInvalid && !passwordInvalid) {
      history.push("/admin");
    }
  };

  return (
    <div className="d-flex mt-5 justify-content-center">
      <div className="col-8 card pt-4 pb-2">
        <h2 class="card-title">Iniciar Sesión</h2>
        <form>
          <div className="form-group">
            <label for="emailInput">Email</label>
            <input
              type="email"
              className={"form-control " + isEmailInvalid}
              id="emailInput"
              placeholder="ejemplo@mail.com"
              name="emailInput"
              onChange={handleEmailInput}
              value={emailInput}
            />
            <div class="invalid-feedback">
              Por favor, introduzca un email válido.
            </div>
          </div>
          <div className="form-group">
            <label for="passwordInput">Contraseña</label>
            <input
              type="password"
              className={"form-control " + isPasswordInvalid}
              id="passwordInput"
              placeholder="tu contraseña..."
              name="passwordInput"
              onChange={handlePasswordInput}
              value={passwordInput}
            />
            <div class="invalid-feedback">
              Por favor, introduzca una contraseña.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </button>
        </form>
        <div className="text-right mt-2">
          <Link to="create-account">
            <p>Crear una nueva cuenta</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
