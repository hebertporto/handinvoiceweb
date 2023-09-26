"use client"

import { useState } from "react"
import { useAuthContext } from "@/context/AuthContext"

function Page(): JSX.Element {
  const { signUp, googleAuth } = useAuthContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      await signUp(email, password)
    } catch {
      console.error("Sign up failed")
    }
  }

  return (
    <div className="mt-20 flex items-center justify-center text-black">
      <div className="w-96 rounded bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">Registration</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block font-medium">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 font-semibold text-white"
          >
            Sign up
          </button>
        </form>
        <div>or</div>
        <div className="mt-2 flex items-center justify-between">
          <button
            className="w-full rounded bg-red-500 py-2 font-semibold text-black"
            onClick={() => googleAuth()}
          >
            Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
