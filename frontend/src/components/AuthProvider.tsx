import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';
import { tokenRefresh } from '../api/auth';

interface AuthContextType {
  isAuthorized: boolean | null;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean | null>>;
  checkAuth: () => Promise<void>;
  userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      if (!refreshToken) {
        setIsAuthorized(false);
        setUserId(null);
        return;
      }
      const res = await tokenRefresh(refreshToken);
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        const decoded: any = jwtDecode(res.data.access);
        setUserId(decoded.user_id || null);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setUserId(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setUserId(null);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      setUserId(null);
      return;
    }
    try {
      const decoded: any = jwtDecode(token);
      setUserId(decoded.user_id || null);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch {
      setIsAuthorized(false);
      setUserId(null);
    }
  }, [refreshToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, checkAuth, userId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
