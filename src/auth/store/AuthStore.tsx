import { create } from 'zustand'
import { LoginService } from '../service/LoginService';
import type { User } from '@/interfaces/DefaultResponse';

type AuthState = {
  token: string | null,
  user: User | null,

  login: (username: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  user: null,

  login: async (username, password) => {
    try {
      const data = await LoginService(username, password);
      
      set({
        token: data?.token,
        user: data?.user,
      });

      return true;
    } catch {
      set({ token: null, user: null });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));