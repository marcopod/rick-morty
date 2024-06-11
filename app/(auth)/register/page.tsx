'use client';
import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Register() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
      });
      console.log('Registration Successful', response.data);
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if (result) router.push('/');
    } catch (error) {
      console.error('Registration Failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Test
      <label htmlFor="username">Username:</label>
      <input
        className="text-black"
        type="text"
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
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
