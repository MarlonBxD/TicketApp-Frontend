import { create } from 'zustand'
import { LoginService } from '../service/LoginService';

type AuthState = {
  firstName: string | null,
  lastName: string | null,
  token: string | null,

  login: (username: string, password: string) => Promise<boolean>,
  logout: () => void,
}

export const useAuthStore = create<AuthState>()((set, get) => ({

    firstName: null,
    lastName: null,
    token: null,

    login: async(username: string, password: string) => {
        try {
             const data = await LoginService(username, password);
             set({
                firstName: data.firstName,
                lastName: data.lastName,
                token: data.token,
             })
             console.log(get().token);
             return true;
        } catch (error) {
            set({
                firstName: null,
                lastName: null,
                token: null,
            })
            return false;
        }
    },

    logout: () => {
        set({
            firstName: null,
            lastName: null,
            token: null,
        })
    }
}))