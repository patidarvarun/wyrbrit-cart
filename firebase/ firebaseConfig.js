import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3hLtCicT2IZfkbI7BjDQXKjJmLGV_elQ",
  authDomain: "wyrbritshop.firebaseapp.com",
  databaseURL: "https://wyrbritshop-default-rtdb.firebaseio.com",
  projectId: "wyrbritshop",
  storageBucket: "wyrbritshop.appspot.com",
  messagingSenderId: "573257655209",
  appId: "1:573257655209:web:133dffa370a06cd9bedab8",
  measurementId: "G-M63N0VEX7S",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
