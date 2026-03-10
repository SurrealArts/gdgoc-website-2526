"use client";
import { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg font-semibold bg-white text-black border-2 border-black rounded-full px-6 py-2 hover:bg-gray-100 transition"
            >
              Sign In
            </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 p-3 w-50 bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden">
              <Link 
                href="/login"
                className="block px-2 py-2 bg-[#C3ECF6] hover:bg-gray-100 transition text-black border-2 border-black rounded-lg text-center"
              >
              I am a member
              </Link>
              <Link 
                href="/sign-up"
                className="block mt-1 px-2 py-2 bg-[#F8D8D8] hover:bg-gray-100 transition text-black border-2 border-black rounded-lg text-center"
              >
              I am a not a member
              </Link>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
