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
// Styles
import "../../styles/styles.css";

export default function AddImageModalItem({ item }) {
  const [imageFileInput, setImageFileInput] = useState(null);
  const [uploadData, setuploadData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successData, setSuccessData] = useState(null);
  // 0 = none, 1 = uploading, 2 = uploaded.
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
          item.id + "-IMG." + formatName[formatName.length - 1]
        )
      );
    }
  };

  const onStateChangeCallback = (data) => {
    console.log(data[0]);
    setUploadState(1);
    setuploadData(data);
    // if (data[0] >= 0) {
    // }
  };

  const onErrorCallback = (message) => {
    setUploadState(0);
    setErrorMessage(message);
  };

  const onSuccessCallback = (data) => {
    console.log(data[1]);
    setSuccessData(data);
    // Upload the image route to this employee document
    if (modifyItem({ ...item, img: data[1] })) {
      setUploadState(2);
      return;
    }
    // if error...
    setErrorMessage("No se pudieron guardar los cambios.");
    setUploadState(0);
  };

  const handleSubmit = () => {
    if (imageFileInput) {
      // Upload to Storage && set callbacks
      const uploadTask = uploadEmployeeImage(imageFileInput);
      setUploadStorageCallbacks(
        uploadTask,
        onStateChangeCallback,
        onErrorCallback,
        onSuccessCallback
      );
      // Post to Database in onSuccessCallback
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
          {/* Progress Bar */}
          <div
            className={`progress ${
              uploadState !== 0 && uploadData ? "visible" : "d-none"
            }`}
            style={{ height: "30px" }}
          >
            <div
              className={`progress-bar progress-bar-striped 
              progress-bar-animated ${
                uploadState === 1
                  ? "bg-info"
                  : uploadState === 2
                  ? "bg-success"
                  : "bg-danger"
              }`}
              role="progressbar"
              aria-valuenow={uploadData ? uploadData[0] : 0}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${uploadData ? uploadData[0] : 0}%` }}
            >
              {uploadState !== 0 && uploadData ? (
                <div className="d-flex justify-content-center align-items-center">
                  <span className="addImageModalItem-ProgressBar-textPercentage mr-1">
                    {uploadData[0]}%
                  </span>
                  <span className="addImageModalItem-ProgressBar-textData">
                    {`[${uploadData[1]} bytes/${uploadData[2]} /
                  bytes]`}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Alerts */}
          <div>
            <div
              className={`alert alert-danger mt-2 ${
                uploadState === 0 && errorMessage ? "visible" : "d-none"
              }`}
              role="alert"
            >
              {errorMessage}
            </div>
            <div
              className={`alert alert-success mt-2 ${
                uploadState === 2 ? "visible" : "d-none"
              }`}
              role="alert"
            >
              {successData && successData[0]}
            </div>
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
