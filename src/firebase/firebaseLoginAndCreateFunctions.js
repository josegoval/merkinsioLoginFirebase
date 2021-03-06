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

export async function loginWithProvider(provider, scope = null) {
  try {
    //   if has scope add it
    if (scope) {
      scope.array.forEach((text) => {
        provider.addScope(text);
      });
    }
    // sign in with pop up...
    const response = await firebase.auth().signInWithPopup(provider);
    const token = await response.credential.accessToken;
    return [true, token];
  } catch (error) {
    return [false, error];
  }
}

/**
 * Try to log out from firebase.
 * @returns true if it does succesfully, false if not.
 */
export async function logOut() {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    return false;
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

    case "auth/operation-not-allowed":
      message = "Esa opereración no está permitida.";
      break;

    case "auth/cancelled-popup-request":
      message = null;
      break;

    default:
      message = "Error general en el formulario.";
      break;
  }

  return message;
}
