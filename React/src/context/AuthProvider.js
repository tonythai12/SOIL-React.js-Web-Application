import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// create Context
const AuthContext = createContext();
// create Provider
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // a user who is logined.
  const [userListData, setUserListData] = useState([]); // all users who are signed up in our store.

  console.log(`userData => ${JSON.stringify(userData)}`);

  useEffect(() => {
    const loginName = localStorage.getItem('loginName');
    const loginEmail = localStorage.getItem('loginEmail');
    const loginPW = localStorage.getItem('loginPW');
    const address = localStorage.getItem('address');
    const singUpDate = localStorage.getItem('signUpDate');

    const preference = localStorage.getItem('preference');
    const dietProfile = localStorage.getItem('dietProfile');
    const dietPlan = localStorage.getItem('dietPlan');
    const imgUrl = localStorage.getItem('imgUrl');

    if (loginEmail && loginPW) {
      // If user information exists in local storage, set the user as logged in.
      setUserData({
        name: loginName,
        email: loginEmail,
        password: loginPW,
        address: address,
        date: singUpDate,
        preference: preference,
        dietProfile: JSON.parse(dietProfile),
        dietPlan: JSON.parse(dietPlan),
        imgUrl,
      });
    }
  }, []);

  // save userDataList
  const signUp = (data) => {
    setUserListData([...userListData, data]);
    localStorage.setItem('userDataList', userListData);
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
    localStorage.setItem('preference', userInfo.preference);
    localStorage.getItem('dietProfile', userInfo.dietProfile);
    localStorage.getItem('dietPlan', userInfo.dietPlan);
    localStorage.getItem('imgUrl', userInfo?.imgUrl);
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
  };

  const saveDietProfile = (profileInfo, email, dietPlan) => {
    console.log(profileInfo);
    // 1. 받아온 profileInfo를 userData에 저장하기, localSotrage도 같이
    // 2. DietPlan에서 profileInfo가 있다면 그에 맞는 다이어트 계획 DB를 가진 컴포넌트를 보여준다.("글자로 거르기??")
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
