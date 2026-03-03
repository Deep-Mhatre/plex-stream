import { SignIn, SignedIn } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Login = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(4, 28, 44, 0.8), rgba(4, 28, 44, 0.8)), url(https://image.tmdb.org/t/p/original/7hhGdFD3F43Z4F24IBigm7DcP0C.jpg)",
      }}
    >
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>

      <SignIn routing="path" path="/login" signUpUrl="/signup" />
    </div>
  );
};

export default Login;
