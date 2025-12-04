
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4ZM20 8C21.1046 8 22 8.89543 22 10C22 11.1046 21.1046 12 20 12C18.8954 12 18 11.1046 18 10C18 8.89543 18.8954 8 20 8ZM28 20C28 24.4183 24.4183 28 20 28V24C22.2091 24 24 22.2091 24 20C24 17.7909 22.2091 16 20 16C17.7909 16 16 17.7909 16 20H12C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        PLEXSTREAM
      </span>
    </Link>
  );
};

export default Logo;
