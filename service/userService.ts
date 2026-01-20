import { env } from "@/env";
import { cookies } from "next/headers";
const AUTH_URL = env.AUTH_URL
export const userService = {
    getSession: async () => {

        const cookieStore = await cookies();
        const allCookies =  cookieStore.toString();

        const res = await fetch(`${AUTH_URL}/get-session`, {
            headers: {
                cookie: allCookies,
            },
            cache: "no-store"
        });

        const session = await res.json();
        return session

       
    }

}