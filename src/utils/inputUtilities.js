export const isNullOrEmpty = (text) => {
  const textTrim = text.trim();

  if (textTrim === "" || textTrim === null) {
    return true;
  }

  return false;
};

export const boostrapIsInvalidInputSytle = (bool) => {
  return bool ? "is-invalid" : "is-valid";
};

/**
 * Check if the first text contains the second ignoring cases.
 * @param {String} text1
 * @param {String} text2
 */
export const stringIncludesText = (text1, text2) => {
  return text1.toLocaleLowerCase().includes(text2.toLocaleLowerCase());
};
