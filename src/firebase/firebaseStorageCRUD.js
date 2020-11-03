// Firebase
import { storageRef } from "./firebase-config";

/**
 * Upload the file to the route on the firebase storage.
 * @param {File} file
 * @param {String} route
 */
async function uploadFile(file, route) {
  try {
    const imgFolderRef = storageRef.child(`${route}/${file.name}`);
    await imgFolderRef.put(file);
    return true;
  } catch (error) {
    return false;
  }

  //   https://firebase.google.com/docs/storage/web/upload-files?hl=es
}

/**
 * Upload the file image to employes/img firebase storage folder.
 * @param {File} imageFile
 */
export async function uploadEmployeeImage(imageFile) {
  return await uploadFile(imageFile, "employees/img");
}
