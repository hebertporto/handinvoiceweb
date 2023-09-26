import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { firebaseApp } from "../config"

const auth = getAuth(firebaseApp)

async function signInEmailAndPassword(email: string, password: string) {
  let result = null, // Variable to store the sign-in result
    error = null // Variable to store any error that occurs

  try {
    result = await signInWithEmailAndPassword(auth, email, password) // Sign in with email and password
  } catch (e) {
    error = e // Catch and store any error that occurs during sign-in
  }

  return { result, error } // Return the sign-in result and error (if any)
}

export { signInEmailAndPassword }
