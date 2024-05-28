import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

// create Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { httpClient } = useAuth();
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState({});

  // get all products
  useEffect(() => {
    const res = httpClient.fetch('/soil/product', {
      method: 'GET',
    });
    if (res.status === 200) {
      setProducts(res.data);
    } else if (res.status === 404) {
      setProducts([]);
      console.error(res.message);
    }
  }, [httpClient]);

  // get all sales products
  useEffect(() => {
    const res = httpClient.fetch('/soil/sale', {
      method: 'GET',
    });
    if (res.status === 200) {
      setSaleProducts(res.data);
    } else if (res.status === 404) {
      console.error(res.message);
    }
  }, [httpClient]);

  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <ProductContext.Provider
      value={{
        products,
        saleProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using context
export const useProduct = () => useContext(ProductContext);
