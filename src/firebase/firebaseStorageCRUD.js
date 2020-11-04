// Firebase
import { storageRef, storage } from "./firebase-config";

//   https://firebase.google.com/docs/storage/web/upload-files?hl=es

/**
 * Upload the file to the route on the firebase storage.
 * @param {File} file
 * @param {String} route
 * @returns firebase.storage.UploadTask or null if any error happens.
 */
function uploadFile(file, route) {
  let uploadTask = null;

  try {
    const imgFolderRef = storageRef.child(`${route}/${file.name}`);
    uploadTask = imgFolderRef.put(file);
    return uploadTask;
  } catch (error) {
    return uploadTask;
  }
}

/**
 * Upload the file image to employes/img firebase storage folder.
 * @param {File} imageFile
 * @returns firebase.storage.UploadTask or null if any error happens.
 */
export function uploadEmployeeImage(imageFile) {
  return uploadFile(imageFile, "employees/img");
}

// CALLBACK FUNCTIONS TO uploadTask

/**
 * Set the callbacks to the uploadTask. <br/>
 * @param {*} uploadTask
 * @param {Function} stateChangedCallback This is feed by an array with [percentage, bytesTransferred, totalBytes],
 * if percentage === -1 it means that the upload it was paused, if percentage === -2 another thing happens.
 * @param {Function} errorCallback This is feed by an error translated string in Spanish, with info about the error.
 * @param {Function} successCallback This is feed by an array with [0] = success translated message in Spanish, [1] = downloadURL.
 * If any error occurs then [1] = null.
 */
export function setUploadStorageCallbacks(
  uploadTask,
  stateChangedCallback,
  errorCallback,
  successCallback
) {
  // Next
  const onGetUploadPercentage = (snapshot) => {
    stateChangedCallback(getUploadPercentage(snapshot));
  };
  // Error
  const onGetUploadError = (error) => {
    errorCallback(getUploadError(error));
  };
  // Success
  const onGetUploadSuccess = async () => {
    successCallback(await getUploadSuccess(uploadTask));
  };
  // Set those callbacks to the uploadTask.on(...)
  uploadTask.on(
    "state_changed",
    onGetUploadPercentage,
    onGetUploadError,
    onGetUploadSuccess
  );
}

/**
 * Get the data from the upload.
 * @param {*} snapshot
 * @returns Array with [percentage, bytesTransferred, totalBytes],
 * if percentage === -1 it means that the upload it was paused, if percentage === -2 another thing happens.
 */
function getUploadPercentage(snapshot) {
  const data = [-1, snapshot.bytesTransferred, snapshot.totalBytes];

  switch (snapshot.state) {
    case "paused":
      break;

    case "running":
      data[0] = (data[1] / data[2]) * 100;
      break;

    default:
      data[0] = -2;
      break;
  }
  return data;
}

/**
 * Get the error from the upload and handle it.
 * @param {Error} error
 * @returns Error translated string in Spanish, with info about the error.
 */
function getUploadError(error) {
  let errorMessage;

  switch (error.code) {
    case "storage/unauthorized":
      errorMessage = "No tienes permisos para realizar dicha acción.";
      // User doesn't have permission to access the object
      break;

    case "storage/canceled":
      errorMessage = "La subida fue cancelada.";
      // User canceled the upload
      break;

    case "storage/unknown":
      errorMessage = "Ocurrió un error en el servidor.";
      // Unknown error occurred, inspect error.serverResponse
      break;

    default:
      errorMessage = "Ocurrió un error. No se pudo subir el archivo.";
      break;
  }

  return errorMessage;
}

/**
 * Get the upload success data.
 * @param {*} uploadTask
 * @returns Array with [0] = success translated message in Spanish, [1] = downloadURL. If any error
 * occurs then [1] = null.
 */
async function getUploadSuccess(uploadTask) {
  const response = ["Archivo subido con éxito.", ""];
  try {
    const url = await uploadTask.snapshot.ref.getDownloadURL();
    response[1] = url;
  } catch (error) {
    response[1] = [null];
  }
  return response;
}
