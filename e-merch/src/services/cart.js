import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import { setCart, addToCart, updateCartItemQuantity, removeFromCart, emptyCart } from '../app/cartSlice';
import { setAlert } from "../app/snackbarSlice";
import { setLoading } from "../app/loadingSlice";
import db from "../firebase";

// Cart Methods

// Fetch cart collection by user id
export const GetCart = async (user, dispatch) => {
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
};

// Add a cart item to cart by user id
export const AddItem = async (user, dispatch, product) => {
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
};

export const SetAlert = async(dispatch, isOpen, isAdded, severity, message) => {
    dispatch(setAlert({
        isOpen: isOpen, 
        isAdded: isAdded, 
        severity: severity,
        message: message
    }))
}

export const SetLoading = async(dispatch, isLoading) => {
    dispatch(setLoading({isLoading: isLoading}))
}

// Update product quantity from cart by cart id
export const UpdateItemQuantity = async (dispatch, cartItem, quantity) => {
    const cartRef = doc(db, "cart", cartItem.id)
    const cartSnap = await getDoc(cartRef)
    cartItem.quantity = quantity

    if (cartSnap.exists()) {
        await updateDoc(cartRef, { quantity: quantity })
        dispatch(updateCartItemQuantity({quantity: quantity}))
    //   setCart([...cart])
    } else {
    //   setCartAlertProps({
    //     open: true,
    //     addStatus: false
    //   })
    }
};
  
// Remove product from user cart by product id
export const DeleteItem = async (dispatch, cartId) => {
    const cartRef = doc(db, "cart", cartId)
    const cartSnap = await getDoc(cartRef)

    if (cartSnap.exists()) {
      await deleteDoc(cartRef)
      dispatch(removeFromCart({id: cartId}))
    //   setCart(cart.filter((item) => item.id !== cartId))
    } else {
    //   setCartAlertProps({
    //     open: true,
    //     addStatus: false
    //   })
    }
};
  
// Enable authentication here, maybe it's time to jump to firebase from here. Before implementing this empty cart function
export const DeleteCart = async (user, dispatch) => {
    const cartRef = collection(db, "cart")
    const cartQuery = await query(cartRef, where("userID", "==", user.uid))
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
    //   setCart([])
    //   setCartAlertProps({
    //     open: true,
    //     addStatus: false,
    //     delete: true
    //   })
    } else {
    //   setCartAlertProps({
    //     open: true,
    //     addStatus: false,
    //     delete: false
    //   })
    }
};
