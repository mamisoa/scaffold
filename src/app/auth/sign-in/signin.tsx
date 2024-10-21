'use client';
import { handleEmailSignIn } from "@/lib/auth/emailSignInServerAction";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { handleUsernameSignIn } from "@/lib/auth/usernameSignInServerAction";
import { useState, useTransition } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {

  const [isPending, startTransition] = useTransition();
  const [isPendingLink, startTransitionLink] = useTransition();
  
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [emailLink, setEmailLink] = useState({ email: "" });
  const [isSubmittingLink, setIsSubmittingLink] = useState(false); // Added local state for form submission status

  const handleSubmitEmail = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    setIsSubmittingLink(true); // Set the state to disable input and button

    try {
      startTransitionLink(async () => {
        await handleEmailSignIn(emailLink.email);
        setIsSubmittingLink(false); // Re-enable input and button after submission completes
      });
    } catch (error) {
      console.error(error);
      setIsSubmittingLink(false); // Ensure to re-enable on error
    }
  };

  const handleSubmitCredentials = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    setIsSubmittingLink(true); // Set the state to disable input and button

    try {
      startTransitionLink(async () => {
        await handleUsernameSignIn(formData);
        setIsSubmittingLink(false); // Re-enable input and button after submission completes
      });
    } catch (error) {
      console.error(error);
      setIsSubmittingLink(false); // Ensure to re-enable on error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Sign In</h2>

        {/* Standard Sign In Form */}
        <form
          onSubmit={handleSubmitCredentials}
          className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-black block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-md ${isSubmittingLink ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={isSubmittingLink} // Disable button when form is submitting
            >
            Sign In
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center justify-center mt-4 mb-4">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="w-full border-t border-gray-300" />
        </div>

        {/* Email Link Sign In Form */}
        <form 
          onSubmit={handleSubmitEmail}
          className="my-2 space-y-4">
          <div>
            <label htmlFor="email-link" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="text-black mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="email"
              id="email-link"
              value={emailLink.email}
              maxLength={320}
              placeholder="Email address"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmailLink({ email: event.target.value })
              }
              disabled={isSubmittingLink} // Disable input when form is submitting
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full p-2 rounded-md ${isSubmittingLink ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={isSubmittingLink} // Disable button when form is submitting
          >
            {isSubmittingLink ? 'Emailing the link...' : 'Sign in with your email'}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center justify-center mt-4 mb-4">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <hr className="w-full border-t border-gray-300" />
        </div>

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
  );
}
