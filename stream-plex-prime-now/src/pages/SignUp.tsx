import { SignUp as ClerkSignUp, SignedIn } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "@/components/Logo";

const SignUp = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4, 28, 44, 0.8), rgba(4, 28, 44, 0.8)), url(https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg)",
      }}
    >
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>

      <ClerkSignUp routing="path" path="/signup" signInUrl="/login" />
    </div>
  );
};

export default SignUp;
