/*Without this code, if you wanted to show the logged-in user's name in the Header and the Profile page, 
you would have to pass the user data down through every single component like a bucket brigade.*/

import { createContext } from "react";
import { useState } from "react";

export const userContext = createContext({});  // Create a context for user information

export function UserContextProvider({ children }) {  // Context provider component

  const [userInfo, setUserInfo] = useState({});

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}> {/* Provide user info and setter to children */}
      {children}
    </userContext.Provider>
  );
}