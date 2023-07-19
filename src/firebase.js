// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGtHYd2F0pMmnkcY8vUNF9vIAPtlghMmA",
    authDomain: "product-6302c.firebaseapp.com",
    projectId: "product-6302c",
    storageBucket: "product-6302c.appspot.com",
    messagingSenderId: "152279766067",
    appId: "1:152279766067:web:bdcd85c12193b17496ff46",
    measurementId: "G-W30H9LS9S4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);