// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1rncdgnBZIwotnEI4PJMo-ceMsHzfReY",
  authDomain: "lebato-store.firebaseapp.com",
  projectId: "lebato-store",
  storageBucket: "lebato-store.firebasestorage.app",
  messagingSenderId: "426117570447",
  appId: "1:426117570447:web:16086dcf2a714ff1f2f5fa",
  measurementId: "G-8TM46ZR3Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore db so other modules can use it
export { db };