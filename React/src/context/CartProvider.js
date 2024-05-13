import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthProvider';

// create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userData } = useAuth();
  // get info
  const userEmail = userData?.email;
  const userCartStorage = userEmail ? localStorage.getItem(userEmail) : null;

  // state
  const [cartProducts, setCartProducts] = useState(
    userCartStorage ? { [userEmail]: JSON.parse(userCartStorage) } : {}
  );

  // add products to cart.
  const addToCart = (product) => {
    const userEmail = userData.email;
    const parsedCartStorage =
      userEmail && userCartStorage ? JSON.parse(userCartStorage) : [];

    let updatedCartProducts;

    // Check if there is an existing product with the same ID
    const existingProductIndex = parsedCartStorage.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the same product exists, increase the quantity
      updatedCartProducts = [...parsedCartStorage];
      updatedCartProducts[existingProductIndex].quantity += 1;
    } else {
      // If the same product doesn't exist, add a new product
      updatedCartProducts = [...parsedCartStorage, { ...product, quantity: 1 }];
    }

    setCartProducts((prevCartProducts) => {
      localStorage.setItem(userEmail, JSON.stringify(updatedCartProducts));
      return { ...prevCartProducts, [userEmail]: updatedCartProducts };
    });
  };

  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        userCartStorage,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using context
export const useCart = () => useContext(CartContext);
