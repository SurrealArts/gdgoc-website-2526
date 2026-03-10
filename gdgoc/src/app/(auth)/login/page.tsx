"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase/client";
import "../../styles/login.css";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    router.push("/about-us");
  };


    return(
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="relative w-[590px] h-[596px] bg-white rounded-[35px] border-5 border-black p-8">

  {/* SVG background with margin inside */}
  <div className="absolute inset-4"> {/* inset-4 = margin around SVG */}
    <svg
      className="w-full h-full"
      viewBox="0 0 511 525"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M146.866 57.9232H22.5C11.4543 57.9232 2.5 66.8775 2.5 77.9232V502.5C2.5 513.546 11.4543 522.5 22.5 522.5H435.463C446.509 522.5 455.463 513.546 455.463 502.5V464.799C455.463 453.753 464.417 444.799 475.463 444.799H488.5C499.546 444.799 508.5 435.845 508.5 424.799V22.5C508.5 11.4543 499.546 2.5 488.5 2.5H186.866C175.821 2.5 166.866 11.4543 166.866 22.5V37.9232C166.866 48.9689 157.912 57.9232 146.866 57.9232Z"
        fill="#B7B7B7"
        stroke="black"
        strokeWidth="5"
      />
    </svg>
  </div>

  {/* Form content */}
  <div className="relative z-10 flex flex-col justify-center h-full p-8">
    <p className="geist-sans text-4xl mb-6 text-black text-right">
      Sign in
    </p>

    <form onSubmit={handleSignIn} className="space-y-4">
      <input
        type="email"
        required
        className="w-full mt-8 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500 text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        required
        className="w-full mt-1 px-4 py-2 border-5 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500 text-black"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="block mx-auto my-12 px-12 py-2 geist-sans border-5 border-black bg-[#3f3f3f] text-white text-lg rounded-lg hover:opacity-80 transition font-medium disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>

    <div className="mt-6 text-center text-sm">
      <span className="text-gray-500">Don't have an account? </span>
      <a
        href="/sign-up"
        className="text-blue-600 font-medium hover:underline"
      >
        Sign up
      </a>
    </div>
  </div>
</div>
</div>
    )
    
}


