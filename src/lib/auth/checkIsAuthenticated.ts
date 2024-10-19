"use server";

import { auth } from "./authConfig";

export async function checkIsAuthenticated() {
    const session = await auth();
    if (session) {
        return true;
    } else {
        return false;
    }
}