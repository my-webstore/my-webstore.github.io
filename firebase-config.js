import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    sendPasswordResetEmail,
    updateProfile,        // <--- ADDED: Needed to save User Names
    GoogleAuthProvider, 
    signInWithPopup 
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
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"; // <--- ADDED: For Image support

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // <--- INITIALIZED
const analytics = getAnalytics(app); 
const googleProvider = new GoogleAuthProvider();

// Customizing Google Provider for better Mobile Experience
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { 
    app,
    auth, 
    db, 
    storage,   // <--- EXPORTED
    analytics,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    sendPasswordResetEmail,
    updateProfile,      // <--- EXPORTED
    signInWithPopup,
    googleProvider,
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