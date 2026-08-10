"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, []);

  return <>{children}</>;
}
