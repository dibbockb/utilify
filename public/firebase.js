import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVAiTG2VyXgJ0np0Ng31KRt_CPAvcqsnI",
    authDomain: "b12a10-utility-management.firebaseapp.com",
    projectId: "b12a10-utility-management",
    storageBucket: "b12a10-utility-management.firebasestorage.app",
    messagingSenderId: "345830929485",
    appId: "1:345830929485:web:e27031b2fd97a3e8ee1804",
    measurementId: "G-YDPLMHWGJH"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();