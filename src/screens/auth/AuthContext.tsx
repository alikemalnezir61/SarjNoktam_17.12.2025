import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { tokenStorage } from './tokenStorage';
import { authApi } from '../../api/auth';

type AuthUser = {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string;
};

type AuthState = {
  isReady: boolean;
  isAuthed: boolean;
  token: string | null;
  user: AuthUser | null;

  signIn: (token: string, user?: AuthUser | null) => void;
  signOut: () => void;

  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const refreshMe = async () => {
    try {
      const res = await authApi.me();
      setUser(res.user ?? null);
    } catch {
      // Token var ama me patlıyorsa: token invalid/expired olabilir -> logout
      tokenStorage.clear();
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const t = tokenStorage.get();
    if (!t) {
      setIsReady(true);
      return;
    }

    setToken(t);

    // Demo modda /me çağırmaya gerek yok; istersen çağırabiliriz.
    const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
    if (demoMode) {
      setIsReady(true);
      return;
    }

    (async () => {
      await refreshMe();
      setIsReady(true);
    })();
  }, []);

  const signIn = (newToken: string, newUser?: AuthUser | null) => {
    tokenStorage.set(newToken);
    setToken(newToken);
    setUser(newUser ?? null);

    // canlı modda login sonrası user yoksa me çekebiliriz
    const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
    if (!demoMode && !newUser) {
      refreshMe();
    }
  };

  const signOut = () => {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthState>(
    () => ({
      isReady,
      isAuthed: Boolean(token),
      token,
      user,
      signIn,
      signOut,
      refreshMe,
    }),
    [isReady, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>.');
  return ctx;
}
