import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import routes from './routes';
import { ProductProvider } from './context/ProductProvider';
import { CartProvider } from './context/CartProvider';
import HttpClient from './network/http';
import TokenStorage from './db/token';

const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);
const tokenStorage = new TokenStorage();

function App() {
  const routing = useRoutes(routes);

  // Wrap with AuthProvider
  return (
    <AuthProvider httpClient={httpClient} tokenStorage={tokenStorage}>
      <ProductProvider>
        <CartProvider>{routing}</CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
