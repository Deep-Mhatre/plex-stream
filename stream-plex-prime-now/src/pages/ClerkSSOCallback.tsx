import React from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Logo from "@/components/Logo";

const ClerkSSOCallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="mb-6">
        <Logo />
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
};

export default ClerkSSOCallback;
