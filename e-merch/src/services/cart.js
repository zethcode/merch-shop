import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import { setCart, addToCart, updateCartItemQuantity, removeFromCart, emptyCart } from '../app/cartSlice';
import { setAlert } from "../app/snackbarSlice";
import { setLoading } from "../app/loadingSlice";
import { setLoadingComponent } from "../app/loadingComponentSlice";
import db from "../firebase";

// Set snackbar alert status
export const SetAlert = async(dispatch, isOpen, success, severity, message) => {
  dispatch(setAlert({
      isOpen: isOpen, 
      success: success, 
      severity: severity,
      message: message
  }))
}

// Set loading backdrop status
export const SetLoading = async(dispatch, isLoading) => {
  dispatch(setLoading({isLoading: isLoading}))
}

// Set loading backdrop status
export const SetLoadingComponent = async(dispatch, isLoading, component, message) => {
  dispatch(setLoadingComponent({isLoading: isLoading, component: component, message: message}))
}

// Fetch cart collection by user id
export const GetCart = async (dispatch, user) => {
    SetLoadingComponent(dispatch, true, "cart", "We are retrieving your cart data...")
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", user.uid))
    const docSnap = await getDocs(cartQuery)
    const items = []
    
    if (!docSnap.empty) {
      for (const document of docSnap.docs) {
        const productRef = doc(db, "products", document.data().productID);
        const productSnap = await getDoc(productRef);

        items.push({ product: productSnap.data(), ...document.data(), id: document.id })
      }
      dispatch(setCart(items))
    } else {
      console.log("Cart documents does not exist!");
      setCart([])
    }
    SetLoadingComponent(dispatch, false, null, null)
};

// Add a cart item to cart by user id
export const AddItem = async (dispatch, user, product) => {
    SetLoading(dispatch, true)
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", user.uid), where("productID", "==", product.id))
    const cartSnap = await getDocs(cartQuery);
        
    if (cartSnap.empty) {
      const addCartRef = doc(cartRef)
      const data = { productID: product.id, userID: user.uid, quantity: 1 }
      
      await setDoc(addCartRef, data)
      const cartData = { ...data, product: product, id: addCartRef.id }
      dispatch(addToCart(cartData))
      SetAlert(dispatch, true, true, "success", "Added to cart successfully!")
    } else {
        SetAlert(dispatch, true, false, "error", "The item is already in your cart!")
    }

    SetLoading(dispatch, false)
};

// Update product quantity from cart by cart id
export const UpdateItemQuantity = async (dispatch, itemId, quantity) => {
  if (quantity <= 0) {
    SetAlert(dispatch, true, false, "error", "Unable to reduce quantity. Remove the item instead.")
  } else {
    SetLoading(dispatch, true)
    const cartRef = doc(db, "cart", itemId)
    const cartSnap = await getDoc(cartRef)
    
    if (cartSnap.exists()) {
      await updateDoc(cartRef, { quantity: quantity })
      dispatch(updateCartItemQuantity({ id: itemId, quantity: quantity}))
    }

    SetLoading(dispatch, false)
  }
};
  
// Remove product from user cart by product id
export const DeleteItem = async (dispatch, cartId) => {
    SetLoading(dispatch, true)
    const cartRef = doc(db, "cart", cartId)
    const cartSnap = await getDoc(cartRef)

    if (cartSnap.exists()) {
      await deleteDoc(cartRef)
      dispatch(removeFromCart({id: cartId}))
    }
    SetLoading(dispatch, false)
};

// Empty cart of user by user id
export const DeleteCart = async (dispatch, userId) => {
    SetLoading(dispatch, true)
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", userId))
    const cartSnap = await getDocs(cartQuery)

    if (!cartSnap.empty) {
      for (const document of cartSnap.docs) {
        const cartItemRef = doc(cartRef, document.id)
        const cartItemSnap = await getDoc(cartItemRef)

        if (cartItemSnap.exists()) {
          await deleteDoc(cartItemRef)
        }
      }
      dispatch(emptyCart())
    }

    SetLoading(dispatch, false)
};
