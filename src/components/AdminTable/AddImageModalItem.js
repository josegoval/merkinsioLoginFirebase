// React
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Firebase
import {
  uploadEmployeeImage,
  setUploadStorageCallbacks,
} from "../../firebase/firebaseStorageCRUD";
import { modifyItem } from "../../firebase/firebaseDatabaseCRUD";
// Icons
import { BiCloudUpload } from "react-icons/bi";
// Components
import EmployeeCard from "../Cards/EmployeeCard";
// Utils
import { resizeCardImage } from "../../utils/imageResizer";

export default function AddImageModalItem({ item }) {
  const [imageFileInput, setImageFileInput] = useState(null);
  const [uploadData, setuploadData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [uploadState, setUploadState] = useState(0);

  /**
   * Modify button design if state or prop changes
   */
  useEffect(() => {
    setImageFileInput(null);
    setuploadData(null);
    setErrorMessage(null);
    setSuccessData(null);
    setUploadState(0);
  }, [item]);

  const handleImageFileInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeCardImage(file);
      const formatName = file.name.split(".");
      setImageFileInput(
        new File(
          [resizedImage],
          item.id + "IMG." + formatName[formatName.length - 1]
        )
      );
    }
  };

  const onStateChangeCallback = (data) => {
    console.log(data[0]);
    setuploadData(data);
    // if (data[0] >= 0) {
    // }
  };

  const onErrorCallback = (message) => {
    setErrorMessage(message);
  };

  const onSuccessCallback = (data) => {
    setSuccessData(data);
  };

  const handleSubmit = () => {
    if (imageFileInput) {
      // Upload to Storage && set callbacks
      const uploadTask = uploadEmployeeImage(imageFileInput);
      console.log("aplico");
      setUploadStorageCallbacks(
        uploadTask,
        onStateChangeCallback,
        onErrorCallback,
        onSuccessCallback
      );
      console.log("despues");
      // Post to Database
      // modifyItem(modifiedItem);
    }
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
              <div className="form-group d-flex flex-column justify-content-center mt-4 mb-0">
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
                <small id="imageHelp" class="form-text text-muted">
                  Por favor suba una foto de carnet 9x16 ratio.
                </small>
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
              className={`btn ${
                uploadState === 0
                  ? "btn-success"
                  : uploadState === 1
                  ? "btn-warning"
                  : "btn-primary"
              }`}
              onClick={handleSubmit}
            >
              {uploadState === 0
                ? "Subir Imagen"
                : uploadState === 1
                ? "Subiendo imagen"
                : "Imagen Subida"}
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
