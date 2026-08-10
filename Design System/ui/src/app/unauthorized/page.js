"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UnauthorizedPage() {
  const { logout } = useUserContext();
  const router = useRouter();

  const handleGoBackToSignin = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/signin");
  };

  return (
<div
  className="min-h-screen flex flex-col items-center justify-center bg-white relative"
  style={{
    backgroundImage: "url('/403.png')",
    backgroundSize: "80%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Hide background on mobile */}
  <style>
    {`
      @media (max-width: 640px) {
        div[style*="403.png"] {
          background-image: none !important;
        }
      }
    `}
  </style>

  {/* Main 403 image */}
  <img
    src="/403_main.png"
    alt="403"
    className="w-64 h-auto mb-2"
  />

  <p className="text-2xl font-bold mb-2 text-text-main">Access Forbidden</p>
  <p className="mb-6 text-center px-9 text-text-main">
    You do not have permission to access
    <br />
    this page.
  </p>

  <div className="absolute bottom-10 w-full flex justify-between items-end px-6">
    {/* Left button */}
    <button
      onClick={() => router.back()}
      className="border border-text-main bg-white hover:text-button-hover hover:border-button-hover text-text-main font-semibold py-2 px-4 rounded-xl transition duration-200"
    >
      Back
    </button>

    
    <img
      src="/adaan_muted.png"
      alt="Muted Adaan"
      className="w-80 max-w-[40vw] sm:max-w-[50vw] md:max-w-[30vw] h-auto mb-2"
    />

    {/* Right button */}
    <button
      onClick={handleGoBackToSignin}
      className="border border-text-main bg-white hover:text-button-hover hover:border-button-hover text-text-main font-semibold py-2 px-4 rounded-xl transition duration-200"
    >
      Login
    </button>
  </div>
</div>  
  );
}
