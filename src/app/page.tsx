'use client'
import { useEffect, useState } from "react";
import Homepage from "./home/page";
import ReduxProvider from "./StoreProvider";
export default function Home() {
 
  const fetchUser = async () => {
    const user = await fetch('http://localhost:3005/api/users/getToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (user) {
      const data = await user.json();
      console.log('token',data);
    }
    else{
      console.log('error fetching user');
      return;
    }
  }
  // useEffect(() => {
  //   fetchUser();
  // },[]);
  return (
    <ReduxProvider>
      <main>
        <Homepage />
      </main>
    </ReduxProvider>
  );
}
