// authLogic handles user authentication processes

import axios from "axios";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*,.?":]/.test(password);

  if (password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long.",
    };
  }
  if (!hasUpperCase) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasSpecialChar) {
    return {
      isValid: false,
      error: "Password must contain at least one special character.",
    };
  }
  return { isValid: true };
};

export const handleLogin = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  error?: string;
  user?: any;
  token?: string;
}> => {
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.error };
  }
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email." };
  }

  try {
    const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
    const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    const response = await axios.post(API_URL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    return {
      success: true,
      token: response.data.idToken,
      user: {
        id: response.data.localId,
        email: response.data.email,
      },
    };
  } catch (error) {
    console.log("Login error:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || "";

      switch (errorMessage) {
        case "EMAIL_NOT_FOUND":
          return { success: false, error: "No account found with this email" };
        case "INVALID_PASSWORD":
          return { success: false, error: "Incorrect password" };
        case "USER_DISABLED":
          return { success: false, error: "This account has been disabled" };
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          return {
            success: false,
            error: "Too many attempts. Try again later",
          };
        default:
          return { success: false, error: "Login failed. Please try again." };
      }
    }
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

export const handleSignUp = async (
  email: string,
  password: string,
  username: string
): Promise<{
  success: boolean;
  error?: string;
  user?: any;
  token?: string;
}> => {
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.error };
  }
  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email." };
  }
  if (!username || username.trim().length < 4) {
    return {
      success: false,
      error: "Username must be at least 4 characters long.",
    };
  }

  try {
    const FIREBASE_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
    const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const response = await axios.post(API_URL, {
      email: email,
      password: password,
      returnSecureToken: true,
      displayName: username,
    });
    return {
      success: true,
      token: response.data.idToken,
      user: {
        id: response.data.localId,
        email: response.data.email,
        username: username,
      },
    };
  } catch (error) {
    console.log("Sign-up error:", error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || "";

      switch (errorMessage) {
        case "EMAIL_EXISTS":
          return { success: false, error: "Email already in use" };
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          return {
            success: false,
            error: "Too many attempts. Try again later",
          };
        default:
          return {
            success: false,
            error: "Sign-up failed. Please try again.",
          };
      }
    }
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
