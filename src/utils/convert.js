import { containsFloatNumberFormat } from "./regexTests";

/**
 * Convert an string to float number (any value . or ,)
 * @param {String} number Text number to transform
 * @returns {Number} number formatted
 */
export const stringToFloat = (number) => {
  const replaced = number.replace(",", ".");
  return containsFloatNumberFormat(replaced) && replaced.length > 0
    ? Number(replaced)
    : NaN;
};

/**
 * Replace all letters and subsequent ., with empty string
 * @param {String} text
 */
export const replaceAllNoFloatFormat = (text) => {
  const replaceComas = text.replace(",", ".");
  const replaceNumbers = replaceComas.replace(/[^0-9.]/g, "");
  return replaceNumbers;
};
