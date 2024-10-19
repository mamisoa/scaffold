import { DashboardPage } from "./dashboard";

export default async function Dashboard() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg text-black">
          <DashboardPage />
        </div>
      </div>
    );
  }
  