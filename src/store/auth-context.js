import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
   isLoggedIn: false,
   onLogout: () => {},
   onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
   //state managment
   //>>login management
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   //side effect for login information
   useEffect(() => {
      const userLoginInfo = localStorage.getItem('LoggedIn');
      if (userLoginInfo === '1') {
         setIsLoggedIn(true);
      }
   }, []);

   //logout function handler
   const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('LoggedIn');
   };

   //login function handler
   const loginHandler = () => {
      setIsLoggedIn(true);
   };

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};
export default AuthContext;
