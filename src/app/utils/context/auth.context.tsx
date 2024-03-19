'use client'

import { useState, useEffect, createContext } from "react";
import authService from "../services/auth.service";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({});

export default function AuthProviderWrapper(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const router = useRouter()

  const storeToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      authService
        .verify()
        .then((response: any) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setLoggedInUser(user);
        })
        .catch((error: any) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setLoggedInUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setLoggedInUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        loggedInUser,
        userInfo,
        setUserInfo,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
