'use client';

import Button from '@ui/components/button';
import Input from '@ui/components/input';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      signIn('credentials', {
        email: formValues.email,
        password: formValues.password,
        callbackUrl: '/',
      });
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Input
        label="Email"
        required
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        required
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
      />
      <div className="mt-3">
        <Button disabled={loading}>{loading ? '...' : 'Sign In'}</Button>
        {!loading && (
          <Button className="ml-1" disabled={loading} displayType="outline">
            <Link href="/auth/signup">or sign up</Link>
          </Button>
        )}
      </div>
    </form>
  );
};
