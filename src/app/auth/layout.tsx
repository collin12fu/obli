// src/app/auth/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // ✅ Only one level up

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {/* 🚫 Do NOT include <Header /> here */}
        {children}
      </body>
    </html>
  );
}