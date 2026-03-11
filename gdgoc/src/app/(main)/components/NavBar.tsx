"use client";
import { useState, useRef, useEffect } from "react";
import { useUser } from "./UserProvider";
import { supabase } from "@/app/utils/supabase/client";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, profile, loading, isAdmin } = useUser();
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  const firstName = profile?.first_name ?? "";
  const lastName = profile?.last_name ?? "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "User";

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

        <div className="relative" ref={dropdownRef}>
          {!loading && user ? (
            // — Logged in: avatar button —
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-blue-500 border-2 border-black text-white font-bold text-sm flex items-center justify-center hover:bg-blue-600 transition"
            >
              {initials}
            </button>
          ) : (
            // — Logged out: Sign In button —
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lg font-semibold bg-white text-black border-2 border-black rounded-full px-6 py-2 hover:bg-gray-100 transition"
            >
              Sign In
            </button>
          )}

          {isOpen && (
            <div className="absolute right-0 mt-2 p-3 w-50 bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden">
              {user ? (
                // — Profile dropdown —
                <>
                  <div className="px-2 py-2 mb-1 text-center">
                    <p className="font-semibold text-black text-sm">{fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <hr className="border-black mb-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full block px-2 py-2 bg-[#F8D8D8] hover:bg-red-200 transition text-black border-2 border-black rounded-lg text-center text-sm font-semibold"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                // — Sign in dropdown —
                <>
                  <Link
                    href="/login"
                    className="block px-2 py-2 bg-[#C3ECF6] hover:bg-gray-100 transition text-black border-2 border-black rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    I am a member
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block mt-1 px-2 py-2 bg-[#F8D8D8] hover:bg-gray-100 transition text-black border-2 border-black rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    I am not a member
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
