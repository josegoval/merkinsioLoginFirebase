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
