import React, { createContext, useContext, useState, useCallback } from "react";
import { getCurrentUser, login as storeLogin, signup as storeSignup, logout as storeLogout, type User } from "./store";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (email: string, password: string, name: string) => { success: boolean; error?: string };
  logout: () => void;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser);

  const refresh = useCallback(() => setUser(getCurrentUser()), []);

  const login = (email: string, password: string) => {
    const result = storeLogin(email, password);
    if (result.success) refresh();
    return result;
  };

  const signup = (email: string, password: string, name: string) => {
    const result = storeSignup(email, password, name);
    if (result.success) refresh();
    return result;
  };

  const logout = () => {
    storeLogout();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, signup, logout, refresh }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
