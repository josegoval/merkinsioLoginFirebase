// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Firebase
import { modifyItem } from "../../firebase/firebaseDatabaseCRUD";
// Icons
import { BiCloudUpload } from "react-icons/bi";
// Components
import EmployeeCard from "../Cards/EmployeeCard";
// Utils
import { resizeCardImage } from "../../utils/imageResizer";

export default function AddImageModalItem({ item }) {
  const [imageFileInput, setImageFileInput] = useState(null);
  const [changesSaved, setChangesSaved] = useState(false);

  /**
   * Modify button design if state or prop changes
   */
  useEffect(() => {
    setChangesSaved(false);
  }, []);

  const handleImageFileInput = async (event) => {
    const file = event.target.files[0];
    const resizedImage = await resizeCardImage(file);
    console.log(resizedImage);
    setImageFileInput(resizedImage);
  };

  const handleSubmit = () => {
    // Post to Database
    // modifyItem(modifiedItem);
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
          <div className="modal-body d-flex flex-column align-items-center">
            <EmployeeCard
              name={item.name}
              lastName={item.lastName}
              wage={item.wage}
              image={imageFileInput}
            />
            <form>
              {/* file input */}
              <div className="form-group d-flex justify-content-center mt-4 mb-0">
                <label
                  for="imageFileInput"
                  className="btn btn-primary d-flex justify-content-center align-items-center"
                >
                  <BiCloudUpload title="Subir Imagen" size={30} />
                  <span className="ml-1">Seleccione una imagen.</span>
                  <input
                    type="file"
                    className="d-none"
                    id="imageFileInput"
                    accept="image/*"
                    onChange={handleImageFileInput}
                  />
                </label>
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
