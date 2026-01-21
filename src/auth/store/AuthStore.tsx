import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LoginService } from '../service/LoginService';
import type { User } from '@/interfaces/DefaultResponse';

type AuthState = {
  token: string | null,
  user: User | null,

  login: (username: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user
      }),
    }
  )
);