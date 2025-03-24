import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login Social no Next.js",
  description: "Criando um fluxo de login social no next.js",
};

/**
 * Root Layout Component
 * This is the main layout component that wraps all pages
 * It provides the basic HTML structure and metadata
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* 
        Head section with viewport and charset meta tags
        These ensure proper rendering and touch behavior
      */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Social Login Demo</title>
      </head>
      {/* 
        Body section with Tailwind classes
        antialiased - Smooths font rendering
        min-h-screen - Ensures minimum height of 100vh
      */}
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
