import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFb3t8ugQ073mfwgTpLXEatwgU8vUTdMs",
  authDomain: "react-firebase-crud-df1d5.firebaseapp.com",
  projectId: "react-firebase-crud-df1d5",
  storageBucket: "react-firebase-crud-df1d5.firebasestorage.app",
  messagingSenderId: "570413210200",
  appId: "1:570413210200:web:777521d65d87ed862bc82d",
  measurementId: "G-WTM9WXWBPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
