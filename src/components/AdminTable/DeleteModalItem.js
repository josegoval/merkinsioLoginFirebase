// React
import React from "react";
import PropTypes from "prop-types";
// Firebase
import { deleteItem } from "../../firebase/firebaseDatabaseCRUD";

export default function DeleteModalItem({ item }) {
  const handleSubmit = () => {
    // Post to Database
    deleteItem(item.id);
  };

  return (
    <div
      className="modal fade"
      id="deleteItemModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="deleteItemModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title" id="deleteItemModalTitle">
              Confirmar eliminación
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-justify">
              ¿Está seguro de que quiere eliminar el registro del siguiente
              trabajador?:
            </p>
            <p>
              <strong>Id: {item.id}</strong>
              <br />
              <strong>Nombre: {item.name}</strong>
              <br />
              <strong>Apellidos: {item.lastName}</strong>
              <br />
              <strong>Sueldo: {item.wage}€</strong>
              <br />
            </p>
          </div>
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
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={handleSubmit}
            >
              Eliminar trabajador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModalItem.propTypes = {
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
