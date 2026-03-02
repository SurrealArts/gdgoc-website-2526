"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center pt-6 pb-6 px-8">
      <div className="bg-yellow-100 rounded-full border-2 border-black px-8 py-3 flex items-center justify-end gap-8 w-full">
        <Link
          href="/about-us"
          className="text-lg font-semibold text-black hover:text-blue-600 transition"
        >
          About us
        </Link>
        <Link
          href="/events"
          className="text-lg font-semibold text-black hover:text-blue-600 transition"
        >
          Events
        </Link>
        <Link
          href="/shop"
          className="text-lg font-semibold text-black hover:text-blue-600 transition"
        >
          Shop
        </Link>
        <Link
          href="#"
          className="text-lg font-semibold text-black hover:text-blue-600 transition"
        >
          Freedom Wall
        </Link>
        <Link
          href="/sign-up"
          className="text-lg font-semibold bg-white text-black border-2 border-black rounded-full px-6 py-2 hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
