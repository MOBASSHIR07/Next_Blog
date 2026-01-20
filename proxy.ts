import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/service/userService";


 

export async function proxy(request:NextRequest) {
  const pathname = request.nextUrl.pathname

    console.log("The current url is :", request.url);

      let isAuthenticated = false

      let isAdmin = false



   const session = await userService.getSession()

   console.log(session);

   if(session){

    isAuthenticated = true;

    isAdmin = session.user.role === "ADMIN"

   }

    if(!isAuthenticated){

        return NextResponse.redirect(new URL('/logIn',request.url))

    }
    if(isAdmin && pathname.startsWith('/dashboard')){
      return NextResponse.redirect(new URL('/admin-dashboard',request.url))
    }
    if(!isAdmin && pathname.startsWith('/admin-dashboard')){
      return NextResponse.redirect(new URL('dashboard',request.url))
    }

    return NextResponse.next()

}



export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*"
  ]
};
