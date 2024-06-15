'use client';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords don't match.");
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
      });
      console.log('Registration Successful', response.data);
      await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      router.push('/');
    } catch (error) {
      console.error('Registration Failed', error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
          Register
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>
        <div className="flex justify-center mt-10 w-full">
          <a
            href="/login"
            className="w-full px-3 py-2 text-red text-center text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
