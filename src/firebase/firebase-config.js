// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDhyrOC7IS0Yhu4V81OhqHjZc-oRO8o3J0",
  authDomain: "merkinsiologinfirebase.firebaseapp.com",
  databaseURL: "https://merkinsiologinfirebase.firebaseio.com",
  projectId: "merkinsiologinfirebase",
  storageBucket: "merkinsiologinfirebase.appspot.com",
  messagingSenderId: "93284612996",
  appId: "1:93284612996:web:414cee1d22de919c32bbd1",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// database
export const db = firebase.firestore();
// storage
export const storage = firebase.storage();
export const storageRef = storage.ref();

// Providers
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
