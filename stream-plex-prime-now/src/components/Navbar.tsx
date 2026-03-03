
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, LogOut, User, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/clerk-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    toast.success('Successfully logged out');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/90 to-background/60 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-sm font-medium hover:text-primary transition-colors">
              Movies
            </Link>
            <Link to="/tvshows" className="text-sm font-medium hover:text-primary transition-colors">
              TV Shows
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/60">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    {user?.imageUrl ? (
                      <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {(user?.firstName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || "U").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>My Watchlist</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <Button 
              variant="default" 
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </SignedOut>
          
          <Button variant="ghost" size="icon" className="rounded-full md:hidden hover:bg-background/60">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
