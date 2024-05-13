import React, { createContext, useContext, useEffect, useState } from 'react';

// create Context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // get products list from product.json
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error('An error occurred while loading the data.', error)
      );
  }, []);

  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for using context
export const useProduct = () => useContext(ProductContext);
