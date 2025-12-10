import { handleLogin, handleSignUp } from "@/services/authLogic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  // Using useEffectw with checkAuthStatus to see if user is logged in and if there is stored token. The [] in the end means it only runs once when component mounts.
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log("Error determining authentication status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await handleLogin(email, password);

      if (result.success && result.token && result.user) {
        setToken(result.token);
        setUser(result.user);

        // Saving the token and user data to AsyncStorage for persistence
        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("user", JSON.stringify(result.user));

        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log("Login error in the context:", error);
      return {
        success: false,
        error: "An unexpected error occurred during login.",
      };
    }
  };

  const signup = async (
    email: string,
    password: string,
    username: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await handleSignUp(email, password, username);

      if (result.success && result.user && result.token) {
        setUser(result.user);
        setToken(result.token);

        await AsyncStorage.setItem("token", result.token);
        await AsyncStorage.setItem("user", JSON.stringify(result.user));

        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log("There was an error during signup:", error);
      return {
        success: false,
        error: "An unexpected error occurred during signup.",
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      setToken(null);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider -> You should check your component tree and ensure that AuthProvider is wrapping the component where useAuth is called."
    );
  }
  return context;
};
