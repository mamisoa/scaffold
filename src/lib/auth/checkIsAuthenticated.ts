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

export async function getSession() {
    const session = await auth();
    console.log("Session:", session);
    if (session) {
        return session;
    } else {
        return false;
    }
}