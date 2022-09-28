import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyBExAN7W9NrLhEMp-h1ezqOa7A9QrHdGMw",
  // authDomain: "wyrbrit-shop.firebaseapp.com",
  // projectId: "wyrbrit-shop",
  // storageBucket: "wyrbrit-shop.appspot.com",
  // messagingSenderId: "94743544547",
  // appId: "1:94743544547:web:8fc49b02edcdaff28afbd6",
  // measurementId: "G-FD3X5QBLGC",
  apiKey: "AIzaSyDKMy3Jw60I64JfQoP-RbjdiLdfut0FOag",
  authDomain: "wyrbrit-varun.firebaseapp.com",
  projectId: "wyrbrit-varun",
  storageBucket: "wyrbrit-varun.appspot.com",
  messagingSenderId: "538024168534",
  appId: "1:538024168534:web:31152d750e11cf5ece7ff7",
  measurementId: "G-0HG6VXCE1E",
};

const firebaseConfiguration = {
  // apiKey: "AIzaSyBExAN7W9NrLhEMp-h1ezqOa7A9QrHdGMw",
  // authDomain: "wyrbrit-shop.firebaseapp.com",
  // projectId: "wyrbrit-shop",
  // storageBucket: "wyrbrit-shop.appspot.com",
  // messagingSenderId: "94743544547",
  // appId: "1:94743544547:web:8fc49b02edcdaff28afbd6",
  // measurementId: "G-FD3X5QBLGC",
  apiKey: "AIzaSyDKMy3Jw60I64JfQoP-RbjdiLdfut0FOag",
  authDomain: "wyrbrit-varun.firebaseapp.com",
  projectId: "wyrbrit-varun",
  storageBucket: "wyrbrit-varun.appspot.com",
  messagingSenderId: "538024168534",
  appId: "1:538024168534:web:31152d750e11cf5ece7ff7",
  measurementId: "G-0HG6VXCE1E",
};
const firebaseApp = firebase.initializeApp(firebaseConfiguration);
export const db = firebaseApp.firestore();

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
