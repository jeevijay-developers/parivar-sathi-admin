import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Toastcontainer from "./Toastcontainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Parivaar sathi',
  description: 'Parivaar sathi - IVF',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        {children}
        <Toastcontainer />
      </body>
    </html>
  );
}
