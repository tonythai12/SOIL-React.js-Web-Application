import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// create Context
const AuthContext = createContext();
// create Provider
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // a user who is logined.
  const [userListData, setUserListData] = useState([]); // all users who are signed up in our store.

  useEffect(() => {
    const loginName = localStorage.getItem('loginName');
    const loginEmail = localStorage.getItem('loginEmail');
    const loginPW = localStorage.getItem('loginPW');
    const address =
      localStorage.getItem('address') || 'Spenser st, Melbourne, Australia';
    const singUpDate = localStorage.getItem('signUpDate');

    const preference = localStorage.getItem('preference');
    const dietProfile = localStorage.getItem('dietProfile');
    const dietPlan = localStorage.getItem('dietPlan');

    const userDataListString = localStorage.getItem('userDataList');
    const userDataList = JSON.parse(userDataListString);
    const parsedDietProfile = dietProfile !== '' ? JSON.parse(dietProfile) : {};
    const parsedDietPlan = dietPlan !== '' ? JSON.parse(dietPlan) : [];

    let imgUrl = localStorage.getItem('imgUrl');

    if (loginEmail && loginPW) {
      if (imgUrl) {
        if (imgUrl.startsWith('data:')) {
          imgUrl = base64ToFile(imgUrl, 'image.jpg', 'image/jpeg');
        }
      }
      // If user information exists in local storage, set the user as logged in.
      setUserData({
        name: loginName,
        email: loginEmail,
        password: loginPW,
        address: address,
        date: singUpDate,
        preference: preference,
        dietProfile: parsedDietProfile,
        dietPlan: parsedDietPlan,
        imgUrl: imgUrl,
      });

      setUserListData([...userDataList]);
    }
  }, []);

  // save userDataList
  const signUp = (data) => {
    const updatedUserListData = [...userListData, data];
    setUserListData(updatedUserListData);
    localStorage.setItem('userDataList', JSON.stringify(updatedUserListData));
  };

  // Account deletion
  const handleDeleteUser = (user) => {
    // 1. delete user in user list
    const newUserList = userListData.filter(
      (data) => data.email !== user.email
    );
    setUserListData([...newUserList]);
    // make logout the user who is deleted
    setUserData(null);

    // revmove from localStorage.
    localStorage.removeItem('loginName');
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginPW');
    localStorage.removeItem('address');
    localStorage.removeItem('signUpDate');
    localStorage.removeItem('preference');
    localStorage.removeItem('dietProfile');
    localStorage.removeItem('dietPlan');
    localStorage.removeItem('imgUrl');
    localStorage.removeItem('emailForRememberMe');
    localStorage.removeItem('pwForRememberMe');
    localStorage.removeItem(userData?.email);

    // go back to home
    navigate('/');
  };

  // save user info who are logged in
  const logIn = (userInfo) => {
    setUserData(userInfo);
    localStorage.setItem('loginName', userInfo.name);
    localStorage.setItem('loginEmail', userInfo.email);
    localStorage.setItem('loginPW', userInfo.password);
    localStorage.setItem('address', userInfo.address);
    localStorage.setItem('signUpDate', userInfo.date);
    localStorage.setItem('preference', userInfo?.preference);
    localStorage.setItem('dietProfile', userInfo?.dietProfile);
    localStorage.setItem('dietPlan', userInfo?.dietPlan);
    localStorage.setItem('imgUrl', userInfo.imgUrl);

    // if imgUrl is File system or not.
    if (userInfo.imgUrl instanceof File) {
      fileToBase64(userInfo.imgUrl)
        .then((base64String) => localStorage.setItem('imgUrl', base64String))
        .catch((error) => console.error('Error:', error));
    } else {
      localStorage.setItem('imgUrl', userInfo.imgUrl);
    }
  };

  const logOut = () => {
    setUserData(null);
    localStorage.removeItem('loginName');
    localStorage.removeItem('loginEmail');
    localStorage.removeItem('loginPW');
    localStorage.removeItem('address');
    localStorage.removeItem('signUpDate');
    localStorage.removeItem('preference');
    localStorage.removeItem('dietProfile');
    localStorage.removeItem('dietPlan');
    localStorage.removeItem('imgUrl');
  };

  const savePreference = (preference, email) => {
    const updatedUserDataList = userListData.map((user) => {
      if (user.email === email) {
        return { ...user, preference: preference };
      } else {
        return user;
      }
    });
    // Update the state or wherever userListData is stored
    setUserListData(updatedUserDataList);
    setUserData({ ...userData, preference: preference });
    localStorage.setItem('preference', preference);
    localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList));
  };

  const saveDietProfile = (profileInfo, email, dietPlan) => {
    const updatedUserDataList = userListData.map((user) => {
      if (user.email === email) {
        return {
          ...user,
          dietProfile: { ...profileInfo },
          dietPlan: [...dietPlan],
        };
      } else {
        return user;
      }
    });
    // Update the state or wherever userListData is stored
    setUserListData(updatedUserDataList);
    setUserData({
      ...userData,
      dietProfile: { ...profileInfo },
      dietPlan: [...dietPlan],
    });
    localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList));
    localStorage.setItem('dietProfile', JSON.stringify(profileInfo));
    localStorage.setItem('dietPlan', JSON.stringify(dietPlan));
  };
  return (
    // provide user info to children so that they can use userInfo whenever they want without prop drilling.
    <AuthContext.Provider
      value={{
        userData,
        userListData,
        signUp,
        logIn,
        logOut,
        savePreference,
        handleDeleteUser,
        setUserData,
        setUserListData,
        saveDietProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using context
export const useAuth = () => useContext(AuthContext);

// Decode the Base64 string to binary data and create a File object
function base64ToFile(base64String, fileName, fileType) {
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], fileName, { type: fileType });
}

// Function to convert a file to Base64 encoding for imgUrl in logIn function.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
