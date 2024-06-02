import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

// create Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { httpClient } = useAuth();
  const [products, setProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);

  // get all products from db and save it to the useState.
  const getProducts = async () => {
    const res = await httpClient.fetch('/soil/product', {
      method: 'GET',
    });

    if (res.status === 200) {
      setProducts(res.data);
    } else if (res.status === 404) {
      setProducts([]);
      console.error(res.message);
    }
  };
  // get all special products from db and save it to the useState.
  const getSpecial = async () => {
    const res = await httpClient.fetch('/soil/product/special', {
      method: 'GET',
    });
    if (res.status === 200) {
      setSpecialProducts(res.data);
    } else if (res.status === 404) {
      setSpecialProducts([]);
      console.error(res.message);
    }
  };

  // get all products, special products only when pages is refreshed
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getSpecial();
  }, []);

  return (
    // provide user info to children so that they can use products info whenever they want without prop drilling.
    <ProductContext.Provider
      value={{
        products,
        specialProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using context
export const useProduct = () => useContext(ProductContext);
