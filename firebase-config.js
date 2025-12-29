import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,   // <--- ADDED
    signInWithPopup       // <--- ADDED
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    getDoc, 
    doc, 
    query, 
    where, 
    updateDoc, 
    deleteDoc,
    setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// --- YOUR SPECIFIC KEYS ---
const firebaseConfig = {
  apiKey: "AIzaSyBVu_owHAEAL9pCLr7cpzKQkATSPxrXb0o",
  authDomain: "my-store-my.firebaseapp.com",
  projectId: "my-store-my",
  storageBucket: "my-store-my.firebasestorage.app",
  messagingSenderId: "127240305230",
  appId: "1:127240305230:web:3f7aa8fc9831fb8102a11f",
  measurementId: "G-QP6VC9XK0J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app); 
const googleProvider = new GoogleAuthProvider(); // <--- INITIALIZE GOOGLE

export { 
    app,
    auth, 
    db, 
    analytics,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    sendPasswordResetEmail,
    GoogleAuthProvider, // <--- EXPORT
    signInWithPopup,    // <--- EXPORT
    googleProvider,     // <--- EXPORT
    collection, 
    addDoc, 
    getDocs, 
    getDoc, 
    doc, 
    query, 
    where, 
    updateDoc, 
    deleteDoc,
    setDoc 
};