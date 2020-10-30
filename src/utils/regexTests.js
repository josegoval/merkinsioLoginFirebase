export function containsFloatNumberFormat(text) {
  return /^[0-9]+.?[0-9]*$/.test(text);
}
