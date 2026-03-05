"use client";
import { supabase } from "../../utils/supabase/client";
import "../styles/login.css";

export default function SignUpPage() {

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
</div>
</div>
  
   
    )
}