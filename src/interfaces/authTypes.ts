import { ReactNode } from "react";

export interface AuthContextType {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  token: string;
  id: string;
}

export interface AuthContextProps {
  userData: AuthContextType | null;
  setUserData: React.Dispatch<React.SetStateAction<AuthContextType | null>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface verifyResetCodeValues {
  code: string;
  token: string;
}

export interface resetValues {
  
  token: string ;
  newPassword: string ;
  confirmPassword: string;

}