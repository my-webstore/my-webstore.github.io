// cart-sync.js
import { db } from './firebase-config.js';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// Call this function IMMEDIATELY after a successful login in login.html
export async function syncCartOnLogin(user) {
  const localCartRaw = JSON.parse(localStorage.getItem('myCart'));
  const localCart = Array.isArray(localCartRaw) ? localCartRaw : [];

  const cartRef = doc(db, "carts", user.uid);

  try {
    const docSnap = await getDoc(cartRef);

    if (docSnap.exists()) {
      const dbCart = Array.isArray(docSnap.data().items) ? docSnap.data().items : [];

      const mergedCart = [...dbCart];

      localCart.forEach(localItem => {
        const existingIndex = mergedCart.findIndex(dbItem =>
          dbItem.id === localItem.id &&
          dbItem.selectedSize === localItem.selectedSize &&
          dbItem.selectedColor === localItem.selectedColor
        );

        if (existingIndex > -1) {
          mergedCart[existingIndex].qty = localItem.qty; // local takes precedence
        } else {
          mergedCart.push(localItem);
        }
      });

      await updateDoc(cartRef, { items: mergedCart, updatedAt: serverTimestamp() });
      localStorage.setItem('myCart', JSON.stringify(mergedCart));

    } else {
      if (localCart.length > 0) {
        await setDoc(cartRef, { items: localCart, updatedAt: serverTimestamp() });
      }
    }
  } catch (error) {
    console.error("Cart Sync Error:", error);
  }
}