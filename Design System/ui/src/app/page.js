import React from "react";

import Home from "@/components/Home";
import PrivateLayout from "./(protected)/layout";

const page = () => {
  return (
    <PrivateLayout >
      <Home />
    </PrivateLayout>
  );
};

export default page;
