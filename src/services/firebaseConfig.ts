import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"; // Uncomment when you need Auth

// PASTE YOUR CONFIG OBJECT HERE
const firebaseConfig = {
    apiKey: "AIzaSyAQHvTTYIKhKux8g7rCalxs7nOC3F6Hz8E",
    authDomain: "hygieatvendor.firebaseapp.com",
    projectId: "hygieatvendor",
    storageBucket: "hygieatvendor.firebasestorage.app",
    messagingSenderId: "1075848694059",
    appId: "1:1075848694059:web:41e1ed68dfe28d15f61d6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db };
