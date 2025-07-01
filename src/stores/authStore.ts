import { User } from "@/types";
import { forgotPassword, login, register, validateToken } from "@/utils/auth";
import { create } from "zustand";

type authState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<User | undefined>;
  registerUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<User | undefined>;
  logout: () => boolean;
  initializeAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  clearError: () => void;
};

export const useAuthStore = create<authState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password, rememberMe): Promise<User | undefined> => {
    set({ loading: true, error: null });
    try {
      const response = await login(email, password);

      if (rememberMe) {
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }

      set({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
    }
  },
  registerUser: async (
    username,
    email,
    password
  ): Promise<User | undefined> => {
    set({ loading: true, error: null });
    try {
      const response = await register(username, email, password);

      sessionStorage.setItem("token", response.token);

      set({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      });
    }
  },
  logout: () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      });
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Logout failed",
      });
      return false;
    }
  },

  initializeAuth: async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      try {
        await validateToken(token);
        set({
          isAuthenticated: true,
          token,
          // Don't set user since validateToken doesn't return user data
        });
      } catch (error) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error:
            error instanceof Error ? error.message : "Token validation failed",
        });
      }
    }
  },
  forgotPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await forgotPassword(email);
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Forgot password request failed",
      });
      console.error("Forgot password request failed:", error);
    }
  },
  clearError: () => {
    set({ error: null });
  },
}));
