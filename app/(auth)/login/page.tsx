// Login.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');

  // server action
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        username,
        password,
      });
      router.push('/'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login Failed:'); // Added more context to the error message
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
        <div className="flex justify-center mt-10 w-full">
          <a
            href="/register"
            className="w-full px-3 py-2 text-red text-center text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
