import { redirect } from "next/navigation";
import { DashboardPage } from "./dashboard";
import { checkIsAuthenticated, getSession } from "@/lib/auth/checkIsAuthenticated";

export default async function Dashboard() {
    const isAuthenticated = await checkIsAuthenticated();
    const sessionObj = await getSession();
    if (!isAuthenticated) {
        redirect("/auth/sign-in");
    } else {
        return (
                <>
                <h1>Session Details</h1>
                <DashboardPage session={sessionObj}/>
                </>
          );
    }
    
  }
  