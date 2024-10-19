import { redirect } from "next/navigation";
import { DashboardPage } from "./dashboard";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export default async function Dashboard() {
    const isAuthenticated = await checkIsAuthenticated();

    if (!isAuthenticated) {
        redirect("/auth/sign-in");
    } else {
        return (
                <DashboardPage />
          );
    }
    
  }
  