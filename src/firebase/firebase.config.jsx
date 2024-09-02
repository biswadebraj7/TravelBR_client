







// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAogqjjCvsMSTONQ7Q6fKxGJTkh0fPso0A",
  authDomain: "stayvista-51120.firebaseapp.com",
  projectId: "stayvista-51120",
  storageBucket: "stayvista-51120.appspot.com",
  messagingSenderId: "765000721194",
  appId: "1:765000721194:web:bb79fc111638628bc4f453"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)










// import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apiKey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId: import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
// }

// export const app = initializeApp(firebaseConfig)
