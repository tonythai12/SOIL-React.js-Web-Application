import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

// create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userData, httpClient } = useAuth();
  // state
  const [cartProducts, setCartProducts] = useState([]);

  const getCarts = async () => {
    if (userData) {
      const res = await httpClient.fetch(`/soil/cart/${userData?.user_id}`, {
        method: 'GET',
      });

      if (res.status === 200) {
        setCartProducts(res.data);
      } else if (res.status === 404) {
        setCartProducts([]);
        console.error(res.message);
      }
    }
  };

  const removeItem = async (cart_id, product_id) => {
    const res = await httpClient.fetch(`/soil/cart`, {
      method: 'DELETE',
      body: JSON.stringify({
        cart_id,
        product_id,
      }),
    });

    if (res.status !== 204) {
      return alert(res.message);
    }
  };

  useEffect(() => {
    getCarts();
  }, [userData, removeItem]);

  // add products to cart.
  const addToCart = async (product) => {
    const res = await httpClient.fetch(`/soil/cart/${userData?.user_id}`, {
      method: 'POST',
      body: JSON.stringify({
        product,
      }),
    });
    // Update dietPlan state

    if (res.status === 201) {
      setCartProducts(res.data.carts);
      return res;
    } else {
      return alert(res.message);
    }
  };

  const updateQuantity = async (cart_id, product_id, delta) => {
    const res = await httpClient.fetch('/soil/cart', {
      method: 'POST',
      body: JSON.stringify({
        cart_id,
        product_id,
        delta,
      }),
    });

    const index = cartProducts.findIndex(
      (cart) => cart.cart._id === res.cart_id
    );

    if (index !== -1) {
      // Copy the existing object and update the quantity
      const updatedProduct = {
        ...cartProducts[index],
        quantity: res.data.quantity,
      };

      // Create a new array by updating the object in the original array
      const updatedCartProducts = [
        ...cartProducts.slice(0, index),
        updatedProduct,
        ...cartProducts.slice(index + 1),
      ];

      setCartProducts(updatedCartProducts);
    }
  };

  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using context
export const useCart = () => useContext(CartContext);
