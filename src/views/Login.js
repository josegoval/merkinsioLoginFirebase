// React
import React, { useState } from "react";
// Router
import { Link, useHistory } from "react-router-dom";
import { login, translateAuthErrors } from "../firebase/firebaseFunctions";
// Utils
import {
  isNullOrEmpty,
  boostrapIsInvalidInputSytle,
} from "../utils/inputUtilities";

import "./test.css";

function Login({ setLoggedIn }) {
  let history = useHistory();
  const [isEmailInvalid, setIsEmailInvalid] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [visibleErrorMessage, setVisibleErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleSubmit = async () => {
    const emailInvalid = isNullOrEmpty(emailInput);
    const passwordInvalid = isNullOrEmpty(passwordInput);

    setIsEmailInvalid(boostrapIsInvalidInputSytle(emailInvalid));
    setIsPasswordInvalid(boostrapIsInvalidInputSytle(passwordInvalid));

    if (!emailInvalid && !passwordInvalid) {
      const result = await login(emailInput, passwordInput);
      console.log(result);
      if (result[0]) {
        history.push("/admin:" + result[1]);
        return;
      }

      setVisibleErrorMessage(true);
      setErrorMessage(translateAuthErrors(result[1]));
    }
  };
  //  mt-5
  // col-8
  return (
    <div className="container fullscreen">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-8 card pt-4 px-5">
          <h2 class="card-title text-center">Iniciar Sesión</h2>
          <form>
            {/* Form inputs */}
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
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
              <label htmlFor="passwordInput">Contraseña</label>
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
            {/* Alert */}
            <div
              className={`alert alert-danger ${
                visibleErrorMessage ? "visible" : "d-none"
              }`}
              role="alert"
            >
              {errorMessage}
            </div>
            {/* Submit button */}
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
    </div>
  );
}

export default Login;
