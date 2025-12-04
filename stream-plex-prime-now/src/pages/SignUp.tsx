
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get initials for avatar
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    // Simulate signup process
    setTimeout(() => {
      // Store rich user data
      localStorage.setItem('user', JSON.stringify({
        name,
        email,
        initials,
        avatar: null, // No custom avatar yet
        watchlist: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }));
      
      // Track signup in MongoDB
      fetch('/api/track-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: email,
          action: 'signup',
          name: name,
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.error('Error tracking signup:', err));
      
      setIsLoading(false);
      
      // Simulate successful signup
      toast.success('Account created successfully!');
      
      // Redirect to subscription page
      navigate('/plans');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(4, 28, 44, 0.8), rgba(4, 28, 44, 0.8)), url(https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg)' }}>
      <div className="absolute top-8 left-8">
        <Logo />
      </div>
      
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Join PLEXSTREAM today</p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
