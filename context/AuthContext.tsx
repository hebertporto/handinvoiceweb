"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"

import { firebaseApp } from "@/config/firebase/config"

// Initialize Firebase auth instance
const auth = getAuth(firebaseApp)

// Create the authentication context
export const AuthContext = createContext({})

// Custom hook to access the authentication context
export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Subscribe to the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)
      } else {
        // User is signed out
        setUser(null)
      }
      // Set loading to false once authentication state is determined
      setLoading(false)
    })

    // Unsubscribe from the authentication state changes when the component is unmounted
    return () => unsubscribe()
  }, [])

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
