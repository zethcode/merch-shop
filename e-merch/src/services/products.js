// import { useState, useEffect, useCallback, createRef, useRef, memo } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import db from "../firebase";
// import { useAuthState } from './../firebase';

// Product Methods
export const GetProducts = async () => {
    const productsCol = collection(db, "products")
    const productsSnapshot = await getDocs(productsCol)

    if (!productsSnapshot.empty) {
        const productsList = productsSnapshot.docs.map(doc => { return {...doc.data(), id: doc.id} })

        // setProducts(productsList)
        // setProductsLoading(false)
        return productsList
    } else {
        console.log("Product documents does not exist!")
        return []
    }
};