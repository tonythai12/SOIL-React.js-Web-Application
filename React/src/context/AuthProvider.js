import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, httpClient, tokenStorage }) => {
  const [userData, setUserData] = useState(null); // a user who is logined.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAuth = async () => {
    // get user info using token whenever refreshed.
    const token = tokenStorage.getToken();
    const res = await httpClient.fetch('/soil/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      setUserData(res.data);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  // Account deletion
  const handleDeleteUser = () => {
    setUserData(null);
    tokenStorage.clearToken();
  };

  // save user info who are logged in
  const logIn = (userInfo) => {
    setUserData({ ...userInfo });
  };

  const logOut = () => {
    setUserData(null);
    tokenStorage.clearToken();
  };

  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <AuthContext.Provider
      value={{
        userData,
        logIn,
        logOut,
        handleDeleteUser,
        setUserData,
        httpClient,
        tokenStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using context
export const useAuth = () => useContext(AuthContext);
