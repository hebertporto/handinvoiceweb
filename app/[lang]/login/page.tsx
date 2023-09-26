"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"

function Page(): JSX.Element {
  const { signIn, googleAuth } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch {
      console.error("Sign in failed")
    }
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleForm}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <h1 className="mb-6 text-3xl font-bold text-black">Sign In</h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 font-semibold text-white"
            >
              Sign In
            </button>
          </div>
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
