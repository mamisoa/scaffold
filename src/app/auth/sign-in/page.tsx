import SignInPage from "@/app/auth/sign-in/signin"
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation"

export default async function SignIn() {
    // Check if user is authenticated
    const isAuthenticated = await checkIsAuthenticated();

    if (isAuthenticated) {
        redirect('/dashboard')
    } else {
        return(
            <SignInPage/>
        )
    }
    
}