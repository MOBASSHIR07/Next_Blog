import { userService } from "@/service/userService";
import React from "react";

export default async function Home() {

 const session =  await userService.getSession()

  return (
    <div>
      <h1>Home Page</h1>
      {session?.user ? (
        <p>Welcome {session.user.name}!</p>
      ) : (
        <p>Not logged In।</p>
      )}
    </div>
  );
}