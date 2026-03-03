
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import TVShowDetails from "./pages/TVShowDetails";
import SubscriptionPayment from "./pages/SubscriptionPayment";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Categories from "./pages/Categories";
import GenrePage from "./pages/GenrePage";
import Search from "./pages/Search";
import ArchiveMovies from "./pages/ArchiveMovies";
import ArchiveMovieDetails from "./pages/ArchiveMovieDetails";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Devices from "./pages/Devices";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Profile from "./pages/Profile";
import ClerkSSOCallback from "./pages/ClerkSSOCallback";
import React from "react";

const queryClient = new QueryClient();

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClerkLoading>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-muted-foreground">Loading authentication…</div>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login/sso-callback" element={<ClerkSSOCallback />} />
          <Route path="/signup/sso-callback" element={<ClerkSSOCallback />} />
          <Route path="/sso-callback" element={<ClerkSSOCallback />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/plans" 
            element={
              <ProtectedRoute>
                <Plans />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subscription" 
            element={
              <ProtectedRoute>
                <SubscriptionPayment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/movie/:id" 
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tv/:id" 
            element={
              <ProtectedRoute>
                <TVShowDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/movies" 
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tvshows" 
            element={
              <ProtectedRoute>
                <TVShows />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/categories" 
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/genre/:genreSlug" 
            element={
              <ProtectedRoute>
                <GenrePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/archive" 
            element={
              <ProtectedRoute>
                <ArchiveMovies />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/archive/:id" 
            element={
              <ProtectedRoute>
                <ArchiveMovieDetails />
              </ProtectedRoute>
            } 
          />
          
          {/* Footer page routes */}
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClerkLoaded>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
