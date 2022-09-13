import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBExAN7W9NrLhEMp-h1ezqOa7A9QrHdGMw",
  authDomain: "wyrbrit-shop.firebaseapp.com",
  projectId: "wyrbrit-shop",
  storageBucket: "wyrbrit-shop.appspot.com",
  messagingSenderId: "94743544547",
  appId: "1:94743544547:web:8fc49b02edcdaff28afbd6",
  measurementId: "G-FD3X5QBLGC",
};

const firebaseConfiguration = {
  apiKey: "AIzaSyBExAN7W9NrLhEMp-h1ezqOa7A9QrHdGMw",
  authDomain: "wyrbrit-shop.firebaseapp.com",
  projectId: "wyrbrit-shop",
  storageBucket: "wyrbrit-shop.appspot.com",
  messagingSenderId: "94743544547",
  appId: "1:94743544547:web:8fc49b02edcdaff28afbd6",
  measurementId: "G-FD3X5QBLGC",
};
const firebaseApp = firebase.initializeApp(firebaseConfiguration);
export const db = firebaseApp.firestore();

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
