'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { Button, ButtonGroup, Input, Link, Spacer } from '@nextui-org/react';

export default function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await signIn('credentials',
      {
        username: formData.get('username'),
        password: formData.get('password'),
        redirect: false
      }
    );

    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 rounded shadow-md w-96">
        <h2 className="text-center text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            className="w-full"
          />
          <Spacer y={1} />
          <Input
            label="Password"
            name="password"
            type="password"
            className="w-full"
          />
          <Spacer y={1} />
          <ButtonGroup className="w-full">
            <Button type="submit" fullWidth>Login</Button>
            <Button type="button" color="secondary" as={Link} href="/signup" fullWidth> Signup </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}