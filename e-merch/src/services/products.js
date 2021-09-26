// import { useState, useEffect, useCallback, createRef, useRef, memo } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { setLoadingComponent } from '../app/loadingComponentSlice';
import { setProducts } from '../app/productsSlice';
import db from "../firebase";

// Set loading backdrop status
export const SetLoadingComponent = async(dispatch, isLoading, component, message) => {
    dispatch(setLoadingComponent({isLoading: isLoading, component: component, message: message}))
}

// Product Methods
export const GetProducts = async (dispatch) => {
    SetLoadingComponent(dispatch, true, "products", "Retrieving store items...")
    const productsCol = collection(db, "products")
    const productsSnapshot = await getDocs(productsCol)

    if (!productsSnapshot.empty) {
        const productsList = productsSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })
        dispatch(setProducts(productsList))
    } else {
        console.log("Product documents does not exist!")
        dispatch(setProducts([]))
    }
    SetLoadingComponent(dispatch, false, null, null)
};