// React
import React, { useState } from "react";
import PropTypes from "prop-types";
// Firebase
import { createItem } from "../../firebase/firebaseDatabaseCRUD";
// Utils
import { stringToFloat } from "../../utils/convert";
import {
  boostrapIsInvalidInputSytle,
  isNullOrEmpty,
} from "../../utils/inputUtilities";

export default function AddModalItem({ onSubmit }) {
  const [nameInput, setNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [wageInput, setWageInput] = useState("");
  const [successfulVisible, setSuccessfulVisible] = useState(false);
  const [isNameValidStyle, setIsNameValidStyle] = useState("");
  const [isLastNameValidStyle, setIsLastNameValidStyle] = useState("");
  const [isWageValidStyle, setWageValidStyle] = useState("");

  const validateFields = () => {
    let valid = true;

    setIsNameValidStyle(boostrapIsInvalidInputSytle(false));
    setIsLastNameValidStyle(boostrapIsInvalidInputSytle(false));
    setWageValidStyle(boostrapIsInvalidInputSytle(false));

    if (isNullOrEmpty(nameInput)) {
      // error name
      setIsNameValidStyle(boostrapIsInvalidInputSytle(true));
      valid = false;
    }

    if (isNullOrEmpty(lastNameInput)) {
      // error name
      setIsLastNameValidStyle(boostrapIsInvalidInputSytle(true));
      valid = false;
    }

    if (isNaN(stringToFloat(wageInput))) {
      // error
      setWageValidStyle(boostrapIsInvalidInputSytle(true));
      valid = false;
    }

    return valid;
  };

  const handleSubmit = () => {
    const newItem = {
      name: nameInput,
      lastName: lastNameInput,
      wage: stringToFloat(wageInput),
    };

    if (validateFields()) {
      // Post to Database
      // it needs if, else to succesful logic and so on.
      if (createItem(newItem)) {
        setSuccessfulVisible(true);
        // fetchData
        onSubmit();
        return;
      }
    }
    setSuccessfulVisible(false);
  };

  return (
    <div
      className="modal fade"
      id="addItemModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addItem"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h3 className="modal-title">Crear registro</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* Body */}
          <div className="modal-body">
            <form>
              {/* name */}
              <div className="form-group row">
                <label htmlFor="inputName" className="col-sm-2 col-form-label">
                  Nombre
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className={`form-control ${isNameValidStyle}`}
                    id="inputName"
                    placeholder="Nombre del trabajador..."
                    onChange={(e) => setNameInput(e.target.value)}
                    value={nameInput}
                  />
                  <div className="invalid-feedback">
                    Por favor, introduzca un nombre.
                  </div>
                </div>
              </div>
              {/* lastname */}
              <div className="form-group row">
                <label
                  htmlFor="inputLastName"
                  className="col-sm-2 col-form-label"
                >
                  Apellidos
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className={`form-control ${isLastNameValidStyle}`}
                    id="inputLastName"
                    name="inputLastName"
                    placeholder="Apellidos del trabajador..."
                    onChange={(e) => setLastNameInput(e.target.value)}
                    value={lastNameInput}
                  />
                  <div className="invalid-feedback">
                    Por favor, introduzca un apellido.
                  </div>
                </div>
              </div>
              {/* wage */}
              <div className="form-group row">
                <label htmlFor="editWage" className="col-sm-2 col-form-label">
                  Sueldo
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`form-control ${isWageValidStyle}`}
                    id="editWage"
                    onChange={(e) => setWageInput(e.target.value)}
                    value={wageInput}
                  />
                  <div className="invalid-feedback">
                    Por favor, introduzca un salario válido.
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Feedback alert */}
          <div
            className={`alert alert-success text-center ${
              successfulVisible ? "visible" : "d-none"
            }
            `}
            role="alert"
          >
            ¡Registro completado con éxito!
          </div>
          {/* Buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Añadir Trabajador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddModalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    wage: PropTypes.oneOfType([
      PropTypes.number.isRequired,
      PropTypes.string.isRequired,
    ]),
  }),
};
