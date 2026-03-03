// cart-sync.js (UPDATED for browser ES modules + your firebase-config exports)

import { db, doc, getDoc, setDoc, updateDoc, serverTimestamp } from './firebase-config.js';

// Call this function IMMEDIATELY after a successful login in login.html
export async function syncCartOnLogin(user) {
  try {
    if (!user || !user.uid) return;

    const localCartRaw = JSON.parse(localStorage.getItem('myCart'));
    const localCart = Array.isArray(localCartRaw) ? localCartRaw : [];

    const cartRef = doc(db, "carts", user.uid);
    const docSnap = await getDoc(cartRef);

    if (docSnap.exists()) {
      const dbCart = Array.isArray(docSnap.data().items) ? docSnap.data().items : [];
      const mergedCart = [...dbCart];

      localCart.forEach((localItem) => {
        const existingIndex = mergedCart.findIndex((dbItem) =>
          dbItem.id === localItem.id &&
          dbItem.selectedSize === localItem.selectedSize &&
          dbItem.selectedColor === localItem.selectedColor
        );

        if (existingIndex > -1) {
          // local takes precedence
          mergedCart[existingIndex].qty = localItem.qty;
        } else {
          mergedCart.push(localItem);
        }
      });

      await updateDoc(cartRef, { items: mergedCart, updatedAt: serverTimestamp() });
      localStorage.setItem('myCart', JSON.stringify(mergedCart));
    } else {
      // First-time cart document
      if (localCart.length > 0) {
        await setDoc(cartRef, { items: localCart, updatedAt: serverTimestamp() });
      } else {
        // Keep consistent doc shape if you ever want an empty cart doc
        // (not required, but safe)
        await setDoc(cartRef, { items: [], updatedAt: serverTimestamp() });
      }
    }
  } catch (error) {
    console.error("Cart Sync Error:", error);
  }
}