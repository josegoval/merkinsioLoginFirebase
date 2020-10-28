// React
import React, { useState } from "react";
// Router
import { Link, useHistory } from "react-router-dom";
// Components
import Separator from "../components/Separator";
// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
// Firebase
import {
  login,
  loginWithProvider,
  translateAuthErrors,
} from "../firebase/firebaseFunctions";
import { facebookProvider, googleProvider } from "../firebase/firebase-config";
// Utils
import {
  isNullOrEmpty,
  boostrapIsInvalidInputSytle,
} from "../utils/inputUtilities";

import "./test.css";

function Login() {
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
      // if ok fo to admin
      if (result[0]) {
        history.push("/admin:" + result[1]);
        return;
      }
      // if error display alert
      setVisibleErrorMessage(true);
      setErrorMessage(translateAuthErrors(result[1]));
    }
  };

  const handleSocialSubmit = async (provider) => {
    const result = await loginWithProvider(provider);
    console.log(result);
    if (result[0]) {
      history.push("/admin:" + result[1]);
    }

    // if error display alert
    displayError(result);
  };

  // DISPLAY ERROR
  const displayError = (result) => {
    const translatedMessage = translateAuthErrors(result[1]);

    if (translatedMessage) {
      setVisibleErrorMessage(true);
      setErrorMessage();
    }
  };

  //  mt-5
  // col-8
  return (
    <div className="container fullscreen">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-8 card pt-4 px-5">
          <h2 className="card-title text-center">Iniciar Sesión</h2>
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
              <div className="invalid-feedback">
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
              <div className="invalid-feedback">
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
            <Separator middleText="o inicia con..." />
            {/* Social Media Logins */}
            <button
              type="button"
              className="btn btn-outline-info btn-block"
              onClick={() => handleSocialSubmit(googleProvider)}
            >
              <FcGoogle /> Google
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-block text-center"
              onClick={() => {
                handleSocialSubmit(facebookProvider);
              }}
            >
              <FaFacebook /> Facebook
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
