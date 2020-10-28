// React
import React, { useState } from "react";
// Router
import { useHistory } from "react-router-dom";
// Firebase
import { createUser, translateAuthErrors } from "../firebase/firebaseFunctions";
// Utils
import {
  isNullOrEmpty,
  boostrapIsInvalidInputSytle,
} from "../utils/inputUtilities";
// Css
import "./test.css";

function CreateAccount() {
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
      const result = await createUser(emailInput, passwordInput);
      // if correct move to admin view
      if (result[0]) {
        history.push(`/admin:${result[1]}`);
        return;
      }
      // if error show the correct message
      setErrorMessage(translateAuthErrors(result[1]));
      setVisibleErrorMessage(true);
    }
  };

  return (
    <div className="d-flex fullscreen justify-content-center align-items-center">
      <div className="card p-5">
        <h2 className="card-title text-center">Crear una nueva cuenta</h2>
        <form>
          {/* form inputs */}
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
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
