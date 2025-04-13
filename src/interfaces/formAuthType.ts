export interface RegisterValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ServerErrors {
  code: string;
  description: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ForgotValues {
  email: string;
}