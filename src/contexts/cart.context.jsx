import { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
            (cartItem)=> cartItem.id === productToAdd.id
        ); //gives a boolean value 

    if(existingCartItem){
        return (
            cartItems.map ((cartItem)=> cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
            ) 
        )
    }   
    return [...cartItems, {...productToAdd, quantity: 1 }]
}

const removecartItem = (cartItems, cartItemToremove) => {

    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === cartItemToremove.id
    )

    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== cartItemToremove.id)
    }

    return (
        cartItems.map((cartItem)=> 
            cartItem.id === cartItemToremove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    )

}

const clearCartItem = (cartItems, cartItemsToClear) => cartItems.filter((cartItem)=> cartItem.id !== cartItemsToClear.id);

export const CartContext = createContext({
    isCartOpen : false ,
    setIsCartOpen: ()=>{},
    cartItems : [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart : ()=> {},
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen ] = useState (false);
    const [cartItems, setCartItems] = useState ([]);
    const [ cartCount, setCartCount] = useState(0);

    useEffect (()=> {
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToremove) => {
        setCartItems(removecartItem(cartItems, cartItemToremove));
    }
    
    const clearItemFromCart = (cartItemsToClear) => {
        setCartItems(clearCartItem (cartItems, cartItemsToClear))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems,addItemToCart, cartCount, removeItemToCart, clearItemFromCart };

    return (
        <div>
            <CartContext.Provider value = {value}> {children} </CartContext.Provider>
        </div>
    )
}