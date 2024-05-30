import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

// create Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { httpClient } = useAuth();
  const [products, setProducts] = useState([]);
  const [saleProducts, setSaleProducts] = useState({});

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

  const getSpecialSale = async () => {
    const res = await httpClient.fetch('/soil/sale', {
      method: 'GET',
    });
    console.log(`special =>`, res);
    if (res.status === 201) {
      setSaleProducts(JSON.parse(res.data));
    } else if (res.status === 404) {
      console.error(res.message);
    }
  };
  // get all products
  useEffect(() => {
    getProducts();
  }, []);

  // get all sales products
  useEffect(() => {
    getSpecialSale();
  }, []);

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
