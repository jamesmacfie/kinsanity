'use client';

import Button from '@ui/components/button';
import Input from '@ui/components/input';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: '/' });
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
        label="Name"
        required
        name="name"
        value={formValues.name}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />

      <Input
        label="Email"
        required
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <Input
        label="Password"
        required
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />
      <div className="mt-3">
        <Button disabled={loading}>{loading ? '...' : 'Sign Up'}</Button>
        {!loading && (
          <Button className="ml-1" disabled={loading} displayType="outline">
            <Link href="/auth/signin">or sign in</Link>
          </Button>
        )}
      </div>
    </form>
  );
};
