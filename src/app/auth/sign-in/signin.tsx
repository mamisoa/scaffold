'use client';

import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={() => {}} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value=""
              onChange={() => {}}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value=""
              onChange={() => {}}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <div className="mt-4">
            <button onClick={() => handleGoogleSignIn()} className="flex items-center justify-center w-full bg-white text-black p-2 rounded-md border hover:bg-gray-100 mb-2">
                <FcGoogle className="bg-white w-5 h-5 mr-2" />
                Sign in with Google
            </button>
            <button onClick={() => {}} className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800">
                Sign in with Apple
            </button>
        </div>
      </div>
    </div>
    )
}


