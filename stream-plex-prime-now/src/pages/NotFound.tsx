
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <Logo />
      <h1 className="mt-12 text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Oops! This page doesn't exist.</p>
      <p className="mt-2 text-muted-foreground">
        We can't find the page you're looking for.
      </p>
      <Link to="/">
        <Button className="mt-8">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
