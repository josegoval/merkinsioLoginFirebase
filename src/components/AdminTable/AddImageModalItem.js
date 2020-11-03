// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Firebase
import { modifyItem } from "../../firebase/firebaseDatabaseCRUD";

export default function AddImageModalItem({ item }) {
  const [nameInput, setNameInput] = useState(item.name);
  const [lastNameInput, setLastNameInput] = useState(item.lastName);
  const [wageInput, setWageInput] = useState(item.wage);
  const [changesSaved, setChangesSaved] = useState(false);

  /**
   * Modify the state if prop changes
   */
  useEffect(() => {
    setNameInput(item.name);
    setLastNameInput(item.lastName);
    setWageInput(item.wage);
  }, [item]);

  /**
   * Modify button design if state or prop changes
   */
  useEffect(() => {
    setChangesSaved(false);
  }, [nameInput, lastNameInput, wageInput, item]);

  const handleSubmit = () => {
    const modifiedItem = {
      id: item.id,
      name: nameInput,
      lastName: lastNameInput,
      wage: wageInput,
    };
    // Post to Database
    modifyItem(modifiedItem);
    // Change Button icon
    setChangesSaved(true);
  };

  return (
    <div
      className="modal fade"
      id="addImageItemModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editItem"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h3 className="modal-title">Añadir Imagen</h3>
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
              {/* id */}
              <div className="form-group row">
                <label htmlFor="editId" className="col-sm-2 col-form-label">
                  Id
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="editId"
                    value={item.id}
                  />
                </div>
              </div>
              {/* name */}
              <div className="form-group row">
                <label htmlFor="editName" className="col-sm-2 col-form-label">
                  Nombre
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="editName"
                    placeholder="Nombre del trabajador"
                    onChange={(e) => setNameInput(e.target.value)}
                    value={nameInput}
                  />
                </div>
              </div>
              {/* lastname */}
              <div className="form-group row">
                <label
                  htmlFor="editLastName"
                  className="col-sm-2 col-form-label"
                >
                  Apellidos
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="editLastName"
                    placeholder="Apellidos del trabajador"
                    onChange={(e) => setLastNameInput(e.target.value)}
                    value={lastNameInput}
                  />
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
                    className="form-control"
                    id="editWage"
                    onChange={(e) => setWageInput(e.target.value)}
                    value={wageInput}
                  />
                </div>
              </div>
            </form>
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
              className={`btn ${changesSaved ? "btn-primary" : "btn-success"}`}
              onClick={handleSubmit}
            >
              {changesSaved ? "Cambios Guardados" : "Guardar Modificación"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddImageModalItem.propTypes = {
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
