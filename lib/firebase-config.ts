// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA51MIfcSxBPRsgCDO3YlvA3Syno_PkZ-4",
  authDomain: "dev-pool-6c14c.firebaseapp.com",
  databaseURL: "https://dev-pool-6c14c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dev-pool-6c14c",
  storageBucket: "dev-pool-6c14c.appspot.com",
  messagingSenderId: "502121446727",
  appId: "1:502121446727:web:9cc4e6ee526bdf126e2062",
  measurementId: "G-0FJVVQQG1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const realtimeDatabase = getDatabase(app)

export { realtimeDatabase }