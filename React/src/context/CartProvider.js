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

  // Unit Test ✅ : remove cart item from Cart
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
    } else {
      getCarts();
    }
  };

  // Unit Test ✅ : updateQuantity
  const updateQuantity = async (cart_id, product_id, delta) => {
    // Send a request to update the quantity of a product in the cart
    const res = await httpClient.fetch('/soil/cart', {
      method: 'POST',
      body: JSON.stringify({
        cart_id,
        product_id,
        delta,
      }),
    });

    // If the response status is not 200 (OK), display an alert with the error message
    if (res.status !== 200) {
      return alert(res.message);
    } else {
      // If the update is successful (status 200), trigger a function to update the displayed carts
      getCarts();
    }
  };

  useEffect(() => {
    getCarts();
  }, [userData]);

  // Unit Test ✅ : add products to cart.
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
