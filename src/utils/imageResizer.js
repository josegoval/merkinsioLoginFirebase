// Image resizer
import Resizer from "react-image-file-resizer";

/**
 * Resize the card image to the correct format.
 * @param {File} file
 */
export const resizeCardImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      110,
      125,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob",
      110,
      125
    );
  });
