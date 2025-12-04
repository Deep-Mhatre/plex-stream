
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, LogOut, User, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface UserData {
  name?: string;
  email: string;
  initials?: string;
  avatar?: string | null;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Track logout in MongoDB
    if (userData?.email) {
      fetch('/api/track-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.email,
          action: 'logout',
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.error('Error tracking logout:', err));
    }
    
    localStorage.removeItem('user');
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
          
          {userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="User menu">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    {userData.avatar ? (
                      <AvatarImage src={userData.avatar} alt={userData.name || userData.email} />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {userData.initials || userData.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
          ) : (
            <Button 
              variant="default" 
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="rounded-full md:hidden hover:bg-background/60">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
