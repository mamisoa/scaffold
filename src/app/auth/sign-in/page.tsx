import SignInPage from "@/app/auth/sign-in/signin"
import { redirect } from "next/navigation"

export default function SignIn() {
    // Check if user is authenticated
    // const isAuthenticated = await checkIsAuthenticated();
    const isAuthenticated = false;

    if (isAuthenticated) {
        redirect('/dashboard')
    } else {
        return(
            <SignInPage/>
        )
    }
    
}