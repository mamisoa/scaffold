import { redirect } from "next/navigation";
import { DashboardPage } from "./dashboard";

export default async function Dashboard() {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        redirect("/auth/sign-in");
    } else {
        return (
                <DashboardPage />
          );
    }
    
  }
  