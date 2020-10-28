import firebase from "./firebase-config";

/**
 * Create a new user
 * @param {string} email
 * @param {string} password
 * @returns if succesfull [true, token] else if error [false, error]
 */
export async function createUser(email, password) {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(response);
    const token = await response.user.getIdToken();
    return [true, token];
  } catch (error) {
    return [false, error];
  }
}

/**
 * Login with an user
 * @param {string} email
 * @param {string} password
 * @returns if succesfull [true, token] else if error [false, error]
 */
export async function login(email, password) {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return [true, token];
  } catch (error) {
    return [false, error];
  }
}

/**
 * Translate the login error messace via code
 * @param {Error} param0 error to destruct
 */
export function translateAuthErrors({ code }) {
  let message;
  switch (code) {
    case "auth/invalid-email":
      message = "Email inválido.";
      break;

    case "auth/user-not-found":
      message = "Email de usuario no encontrado.";
      break;
    case "auth/wrong-password":
      message = "La contraseña no es correcta.";
      break;

    case "auth/weak-password":
      message = "Contraseña demasiado débil.";
      break;

    case "auth/email-already-in-use":
      message = "Ese email ya existe.";
      break;
    default:
      message = "Error general en el formulario.";
      break;
  }

  return message;
}
