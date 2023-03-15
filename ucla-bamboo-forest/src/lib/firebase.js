import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

/*
//Main one
const firebaseConfig = {
    apiKey: "AIzaSyDkJoECKNeJfWoCh8MJ-L2Zs0-4MdoGl-g",
    authDomain: "ucla-bamboo-forest.firebaseapp.com",
    projectId: "ucla-bamboo-forest",
    storageBucket: "ucla-bamboo-forest.appspot.com",
    messagingSenderId: "920132615060",
    appId: "1:920132615060:web:0815f6660ee537853ced81",
    measurementId: "G-5HBY8TTWZN"
};
*/
//Second firebase
const firebaseConfig = {
    apiKey: "AIzaSyAms3E9LVUHjRK6NPoD7b2fHJICVusnqMA",
    authDomain: "ucla-bamboo-forest-v2.firebaseapp.com",
    projectId: "ucla-bamboo-forest-v2",
    storageBucket: "ucla-bamboo-forest-v2.appspot.com",
    messagingSenderId: "381926331081",
    appId: "1:381926331081:web:a2d5ae71766ffa0b203318",
    measurementId: "G-2MQ1N14ETC"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);