"use client";

import ProtectedLayout from "@/components/ProtectedLayout";
import Snowfall from "@/components/Snowfall";


export default function PrivateLayout({ children }) {
  return (
    <ProtectedLayout>
       <Snowfall />
      <div className="p-4 ">{children}</div>
    </ProtectedLayout>
  );
}
