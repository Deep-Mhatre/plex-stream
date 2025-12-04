
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get initials for avatar
    const initials = email.charAt(0).toUpperCase();
    
    // Mock authentication with more user data
    setTimeout(() => {
      // Store more comprehensive user data
      localStorage.setItem('user', JSON.stringify({ 
        email,
        initials,
        name: email.split('@')[0], // Simple name extraction
        avatar: null, // No custom avatar yet
        watchlist: [],
        lastLogin: new Date().toISOString()
      }));
      
      setIsLoading(false);
      
      // Track login in MongoDB
      fetch('/api/track-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: email,
          action: 'login',
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.error('Error tracking login:', err));
      
      toast.success('Successfully logged in!');
      
      // Redirect to home page after login
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(4, 28, 44, 0.8), rgba(4, 28, 44, 0.8)), url(https://image.tmdb.org/t/p/original/7hhGdFD3F43Z4F24IBigm7DcP0C.jpg)' }}>
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">Welcome back to PLEXSTREAM</p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              New to PLEXSTREAM? <Link to="/signup" className="text-primary hover:underline">Sign up now</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
