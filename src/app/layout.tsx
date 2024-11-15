'use client'
import { Poppins } from "next/font/google"
import "./globals.css";
import ReduxProvider from "./StoreProvider";


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-poppins",
  weight: ['100', '200', '400', '700', '900'],
})



// export const metadata: Metadata = {
//   title: "Points",
//   description: "Scan to get points"
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          className={`${poppins.variable}`}
        >
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
