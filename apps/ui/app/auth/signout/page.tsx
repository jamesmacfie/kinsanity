'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default async function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: '/auth/signin' });
  }, []);

  return (
    <div className="flex items-center justify-center mt-16">
      <p>Signing you out, one moment...</p>
    </div>
  );
}
