import { create } from "zustand"

type UserState = {
  id?: number
  name?: string
  email?: string
  token?: string
  setUserData: (data: Partial<UserState>) => void
  clearUserData: () => void
}

const useUserStore = create<UserState>((set) => ({
  id: undefined,
  name: undefined,
  email: undefined,
  token: undefined,

  setUserData: (data) => set((state) => ({ ...state, ...data })),
  clearUserData: () =>
    set({ id: undefined, name: undefined, email: undefined, token: undefined }),
}))

export { useUserStore }
