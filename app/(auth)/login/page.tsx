// Login.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Changed from email to username
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      username,
      password,
    });

    if (result?.error) {
      console.error('Login Failed:', result.error); // Added more context to the error message
    } else if (result.ok) {
      router.push('/'); // Redirect to dashboard after successful login
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        className="text-black"
        type="text" // Changed type from email to text
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className="text-black"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
