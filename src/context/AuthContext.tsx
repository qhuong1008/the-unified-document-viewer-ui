import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = "http://localhost:8080";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  apiRequest: (endpoint: string, options?: RequestInit) => Promise<Response>;
}

interface User {
  username: string;
  token: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load tokens on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    const expiresAt = localStorage.getItem("tokenExpires");

    if (token && expiresAt && Date.now() < parseInt(expiresAt)) {
      setUser({ username: username || "", token });
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    // Store tokens
    localStorage.setItem("accessToken", data.token);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem(
      "tokenExpires",
      String(Date.now() + data.expiresIn * 1000),
    );
    localStorage.setItem("username", username);

    setUser({ username, token: data.token });
  };

  const refreshToken = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");

    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      logout();
      throw new Error("Session expired");
    }

    const data = await response.json();

    localStorage.setItem("accessToken", data.token);
    localStorage.setItem(
      "tokenExpires",
      String(Date.now() + data.expiresIn * 1000),
    );

    setUser((prev) => (prev ? { ...prev, token: data.token } : null));
    return data.token;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpires");
    localStorage.removeItem("username");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
  };

  const getValidToken = async (): Promise<string> => {
    const expiresAt = localStorage.getItem("tokenExpires");

    // Refresh if expiring in < 5 minutes
    if (expiresAt && Date.now() > parseInt(expiresAt) - 5 * 60 * 1000) {
      return refreshToken();
    }

    return localStorage.getItem("accessToken") || "";
  };

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getValidToken();

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If unauthorized, try to refresh once
    if (response.status === 401) {
      const newToken = await refreshToken();

      return fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
      });
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, apiRequest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
