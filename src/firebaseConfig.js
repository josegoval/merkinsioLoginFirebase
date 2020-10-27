// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhyrOC7IS0Yhu4V81OhqHjZc-oRO8o3J0",
  authDomain: "merkinsiologinfirebase.firebaseapp.com",
  databaseURL: "https://merkinsiologinfirebase.firebaseio.com",
  projectId: "merkinsiologinfirebase",
  storageBucket: "merkinsiologinfirebase.appspot.com",
  messagingSenderId: "93284612996",
  appId: "1:93284612996:web:414cee1d22de919c32bbd1",
};

export const app = firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
