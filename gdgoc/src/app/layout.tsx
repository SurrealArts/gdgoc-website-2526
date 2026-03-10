import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./(main)/components/NavBar";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDGoC Mapua University",
  description: "Google Developers Group on Campus Mapua University is a student-led organization dedicated to fostering a community of developers and tech enthusiasts at Mapua University. We aim to provide a platform for learning, collaboration, and innovation in the field of technology. Our mission is to empower students with the skills and knowledge needed to succeed in the tech industry while promoting diversity and inclusion within our community.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-32`}
      >
        {children}
      </body>
    </html>
  )};