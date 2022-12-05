// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC80SLn4qQqb3e1ACe82IieH5FOtW7RLCE",
  authDomain: "mvp-mybudget.firebaseapp.com",
  projectId: "mvp-mybudget",
  storageBucket: "mvp-mybudget.appspot.com",
  messagingSenderId: "97227901178",
  appId: "1:97227901178:web:2c915c312ab04d43ab6143",
  measurementId: "G-2XGLGJJ0BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;