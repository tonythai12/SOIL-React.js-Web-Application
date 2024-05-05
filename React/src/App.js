import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);

  // Wrap with AuthProvider
  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
