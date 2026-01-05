// cart-sync.js
import { db, doc, getDoc, setDoc, updateDoc } from './firebase-config.js';

// Call this function IMMEDIATELY after a successful login in login.html
export async function syncCartOnLogin(user) {
    const localCart = JSON.parse(localStorage.getItem('myCart')) || [];
    const cartRef = doc(db, "carts", user.uid);

    try {
        const docSnap = await getDoc(cartRef);

        if (docSnap.exists()) {
            // MERGE: User has a DB cart and a Local cart
            const dbCart = docSnap.data().items || [];
            
            // Logic: Create a map of existing items to avoid duplicates
            const mergedCart = [...dbCart];
            
            localCart.forEach(localItem => {
                const existingIndex = mergedCart.findIndex(dbItem => 
                    dbItem.id === localItem.id && 
                    dbItem.selectedSize === localItem.selectedSize &&
                    dbItem.selectedColor === localItem.selectedColor
                );

                if (existingIndex > -1) {
                    // If item exists, update quantity (Local takes precedence as it's more recent)
                    mergedCart[existingIndex].qty = localItem.qty; 
                } else {
                    mergedCart.push(localItem);
                }
            });

            // Update DB and LocalStorage with the merged result
            await updateDoc(cartRef, { items: mergedCart });
            localStorage.setItem('myCart', JSON.stringify(mergedCart));

        } else {
            // User has no DB cart, create one with local items
            if (localCart.length > 0) {
                await setDoc(cartRef, { items: localCart, updatedAt: new Date() });
            }
        }
    } catch (error) {
        console.error("Cart Sync Error:", error);
    }
}