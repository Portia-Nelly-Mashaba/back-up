// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA2kSij4CfonwpV_jo8oO53QtxLhan2j-Y",
  authDomain: "hotel-booking-app-d4fc2.firebaseapp.com",
  projectId: "hotel-booking-app-d4fc2",
  storageBucket: "hotel-booking-app-d4fc2.appspot.com",
  messagingSenderId: "1033866641023",
  appId: "1:1033866641023:web:80d147a9d885c71527094a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;