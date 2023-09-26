"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

import { auth, db } from "@/config/firebase/config"

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  googleAuth: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  googleAuth: async () => {},
})

export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const addUserToFirestore = async (user: any) => {
    const userDoc = doc(db, "users", user.uid)
    await setDoc(userDoc, {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
    })
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error("failed to create user")
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error("failed to sign in")
    }
  }

  const googleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.addScope("profile")
      provider.addScope("email")
      await signInWithPopup(auth, provider)
    } catch (error) {
      throw new Error("google failed to sign in")
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user)
        setUser(user)
        router.push("/dashboard")

        // Check if it's a new user
        const creationTime = new Date(
          user.metadata.creationTime ?? new Date()
        ).getTime()
        const lastSignInTime = new Date(
          user.metadata.lastSignInTime ?? new Date()
        ).getTime()
        const isNewUser = Math.abs(lastSignInTime - creationTime) < 5000 // 5 seconds

        if (isNewUser) {
          addUserToFirestore(user).catch((error) => {
            console.error("Error adding user to Firestore: ", error)
          })
        }
      } else {
        // User is signed out
        // setTimeout is used to avoid update state on unmounted component
        router.push("/")
        // TODO: fix update state on unmounted component
        setTimeout(() => {
          setUser(null)
        }, 300)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout, googleAuth }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
