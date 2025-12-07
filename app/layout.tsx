import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "../providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loop",
  description: "Generate your podcasts using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ConvexClerkProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </ConvexClerkProvider>

        <Analytics />
        <Toaster/>
      </body>
    </html>
  );
}
