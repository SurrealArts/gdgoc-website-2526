"use client";
import { supabase } from "../../utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login.css";

export default function SignUpPage() {
  
  const router = useRouter();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [campus, setCampus] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
  
      // Refresh session & redirect
      router.refresh();
      router.push("/dashboard");
    };
  



return(
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="relative w-[578px] h-[660px] bg-white rounded-[50px] border-5 border-black p-8">

  {/* SVG background with margin inside */}
  <div className="absolute inset-4"> {/* inset-4 = margin around SVG */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 499 614"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M142.968 67.4091H22.5C11.4543 67.4091 2.5 76.3634 2.5 87.4091V591.5C2.5 602.546 11.4543 611.5 22.5 611.5H424.721C435.767 611.5 444.721 602.546 444.721 591.5V540.5C444.721 529.454 453.675 520.5 464.721 520.5H476.5C487.546 520.5 496.5 511.546 496.5 500.5V22.5C496.5 11.4543 487.546 2.5 476.5 2.5H182.968C171.923 2.5 162.968 11.4543 162.968 22.5V47.4091C162.968 58.4548 154.014 67.4091 142.968 67.4091Z" 
        fill="#B7B7B7" 
        stroke="black" 
        stroke-width="5"
        />
    </svg>
    
    <div className="relative z-10 flex flex-col justify-center h-full p-8">
    <p className="text-4xl mb-1 mr-5 text-black text-right">
      Sign up
    </p>

    <form onSubmit={handleSignIn} className="space-y-2">

      <input
        type="name"
        required
        className="w-full mt-10 mb-2 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        placeholder="Full Name (Dela Cruz, Juan C.)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        required
        className="w-full mt-1 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        required
        className="w-full mt-1 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        value={campus}
        onChange={(e) => setCampus(e.target.value)}
      >
        <option value="" disabled>
          Campus
        </option>
        <option value="intramuros">Intramuros</option>
        <option value="makati">Makati</option>
      </select>

      <input
        type="password"
        required
        className="w-full mt-1 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        required
        className="w-full mt-1 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="block mx-auto my-12 px-12 py-2 geist-sans border-5 border-black bg-[#3f3f3f] text-white text-lg rounded-lg hover:opacity-80 transition font-medium disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>

    <div className="mt-2 text-center text-sm">
      <span className="text-gray-500">Already a member :) </span>
      <a
        href="/login"
        className="text-blue-600 font-medium hover:underline"
      >
        Login
      </a>
    </div>
  </div>

  </div>
</div>
</div>
    )
}