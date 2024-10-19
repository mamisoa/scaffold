import SignInPage from "@/app/auth/sign-in/signin"
import { redirect } from "next/navigation"

export default function SignIn() {
    const isAuthenticated = false;

    if (isAuthenticated) {
        redirect('/dashboard')
    } else {
        return(
            <SignInPage/>
        )
    }
    
}