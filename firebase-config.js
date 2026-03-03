// firebase-config.js (UPDATED for Browser + ES Modules, Firebase v10.7.1)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  // Email/Password
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,

  // Session
  onAuthStateChanged,
  signOut,

  // Providers
  GoogleAuthProvider,
  signInWithPopup,

  // Anonymous (Guest)
  signInAnonymously,

  // Phone OTP (REAL phone auth – no fake emails)
  RecaptchaVerifier,
  signInWithPhoneNumber,
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
  runTransaction,
  increment,
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
 * - Use this before reading/writing carts/orders/chats/wishlist for guests.
 */
async function ensureSignedIn() {
  try {
    // 1) Already available
    if (auth.currentUser) return auth.currentUser;

    // 2) Wait for Firebase session restore
    const existing = await new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (u) => {
        unsub();
        resolve(u || null);
      });
    });

    if (existing) return existing;

    // 3) Still none => sign in anonymously
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    console.error("ensureSignedIn() failed:", err);
    throw err;
  }
}

/**
 * ✅ Helpers (no UI changes, just reusable logic)
 */
function isGuest(user) {
  return !!user && user.isAnonymous === true;
}

function isEmailUser(user) {
  return !!user && !!user.email && user.isAnonymous !== true;
}

export {
  // Core
  app,
  auth,
  db,
  storage,
  analytics,

  // Auth exports
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,

  onAuthStateChanged,
  signOut,

  GoogleAuthProvider,
  googleProvider,
  signInWithPopup,

  signInAnonymously,

  // ✅ Real Phone OTP exports (no fake emails)
  RecaptchaVerifier,
  signInWithPhoneNumber,

  // ✅ Utility exports
  ensureSignedIn,
  isGuest,
  isEmailUser,

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

  // Transactions / counters
  runTransaction,
  increment,
};