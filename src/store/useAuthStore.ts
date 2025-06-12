import { create } from 'zustand';

interface User {
  email: string;
  nickname: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem('accessToken', user.accessToken);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem('accessToken');
    set({ user: null });
  },
}));

