import { createContext, useEffect, useState } from "react";

import {
  AuthContextProps,
  AuthContextType,
  AuthProviderProps,
} from "../../interfaces/authTypes";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<AuthContextType | null>(null);

  useEffect(() => {
    const storedData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
