import type { Metadata } from "next";
import {Manrope} from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const manrope = Manrope({subsets:['latin']})

export const metadata: Metadata = {
  title: "WAVE",
  description: "Generate your podcasts using AI",
  icons:{
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ConvexClerkProvider>
      <AudioProvider>
      <html lang="en">
      <body
        className={`${manrope.className}`}
      >
       {children}
      </body>
    </html>
      </AudioProvider>
  </ConvexClerkProvider>
  );
}
