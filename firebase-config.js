// firebase-config.js (UPDATED for Browser + ES Modules, Firebase v10.7.1)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
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
  setDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  runTransaction, // ✅ ADDED (needed by checkout.html)
  increment,      // ✅ OPTIONAL but useful (safe to export)
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAnalytics,
  isSupported,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// --- YOUR SPECIFIC KEYS ---
const firebaseConfig = {
  apiKey: "AIzaSyBVu_owHAEAL9pCLr7cpzKQkATSPxrXb0o",
  authDomain: "my-store-my.firebaseapp.com",
  projectId: "my-store-my",
  storageBucket: "my-store-my.firebasestorage.app",
  messagingSenderId: "127240305230",
  appId: "1:127240305230:web:3f7aa8fc9831fb8102a11f",
  measurementId: "G-QP6VC9XK0J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Safe Analytics init (prevents crashes on some browsers)
let analytics = null;
isSupported()
  .then((yes) => {
    if (yes) analytics = getAnalytics(app);
  })
  .catch(() => {
    analytics = null;
  });

// Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * ✅ Ensures there is always an authenticated user.
 * - If user is logged out, it signs in anonymously (guest).
 * - Use this before reading/writing wishlist/orders for guests.
 */
async function ensureSignedIn() {
  if (auth.currentUser) return auth.currentUser;

  // Wait for Firebase to restore session if available
  const existing = await new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => {
      unsub();
      resolve(u);
    });
  });

  if (existing) return existing;

  // If still no user, sign in anonymously
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export {
  app,
  auth,
  db,
  storage,
  analytics,

  // Auth exports
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  googleProvider,

  // ✅ Utility export
  ensureSignedIn,

  // Firestore exports
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  setDoc,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,

  // ✅ Added for checkout/admin/order flows
  runTransaction,

  // ✅ Optional but safe
  increment,
};