import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDkJoECKNeJfWoCh8MJ-L2Zs0-4MdoGl-g",
    authDomain: "ucla-bamboo-forest.firebaseapp.com",
    projectId: "ucla-bamboo-forest",
    storageBucket: "ucla-bamboo-forest.appspot.com",
    messagingSenderId: "920132615060",
    appId: "1:920132615060:web:0815f6660ee537853ced81",
    measurementId: "G-5HBY8TTWZN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);