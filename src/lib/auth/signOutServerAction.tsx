"use server";

import { signOut } from "@/lib/auth/authConfig";

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};