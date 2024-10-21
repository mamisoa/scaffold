"use server";

import { signIn } from "@/lib/auth/authConfig";


export async function handleUsernameSignIn(formdata) {
  try {
    console.log("formdata: ", formdata)
    await signIn("credentials", { ...formdata, callbackUrl: "/dashboard" });
  } catch (error) {
    throw error;
  }
};