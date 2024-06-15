'use client';

import { signIn } from 'next-auth/react';

const login = async (username: string, password: string) => {
  if (typeof window !== undefined) return;
  try {
    await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      username,
      password,
    });
  } catch (error) {
    console.error('Login Failed: ', error);
  }
};

export default login;
