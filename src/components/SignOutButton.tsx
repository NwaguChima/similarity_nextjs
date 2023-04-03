'use client';

import { signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import Button from '@/ui/Button';

interface SignOutButtonProps {}

const SignOutButton: React.FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      //   toast({
      //     title: 'Error signing out',
      //     message: 'Please try again later',
      //     type: 'error',
      //   });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
