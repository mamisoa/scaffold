import { SignInButton } from "./components/sign-in-button";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8 sm:p-20">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-semibold">Hello</h1>
        <SignInButton className="bg-blue-600 border-gray-300 text-white py-2 px-6 rounded-full shadow-md hover:text-white hover:bg-blue-500 hover:shadow-md transition duration-300 ease-in-out"/>
      </main>
    </div>

  );
}
