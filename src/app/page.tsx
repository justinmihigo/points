'use client'
import Image from "next/image";
import Homepage from "./home/page";
import ReduxProvider from "./StoreProvider";
export default function Home() {
  return (
    <ReduxProvider>
        <main>
          <Homepage />
        </main>     
    </ReduxProvider>
  );
}
