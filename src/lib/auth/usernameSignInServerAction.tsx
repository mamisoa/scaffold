"use server";

import { signIn } from "@/lib/auth/authConfig";


export async function handleUsernameSignIn(formdata: object) {
  try {
    console.log("formdata: ", formdata)
    await signIn("credentials", { ...formdata , callbackUrl: "/" });
  } catch (error) {
    throw error;
  }
};