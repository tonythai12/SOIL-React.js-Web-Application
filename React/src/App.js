import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import routes from './routes';
import { ProductProvider } from './context/ProductProvider';
import { CartProvider } from './context/CartProvider';

function App() {
  const routing = useRoutes(routes);

  // Wrap with AuthProvider
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>{routing}</CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
