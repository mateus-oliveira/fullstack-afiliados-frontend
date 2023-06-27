'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { getAuthAccess, setAuthAccess } from './Auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (getAuthAccess()) {
      router.push('/sales')
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
      });

      if (!response.ok) {
        Swal.fire({
          title: 'Não foi dessa vez!',
          text: 'Verifica suas credenciais e tente novamente.',
          icon: 'error',
        });
      } else {
        await response.json().then(({access}) => {
          Swal.fire({
            title: 'Muito bom!',
            text: 'Login efetuado com sucesso',
            icon: 'success',
          });
          setAuthAccess(access);
          router.push('/sales');
        });  
      }

      setLoading(false);
    } catch (error: any) {
      // setError(error.message);
      setLoading(false);
    }
  };

  const handleusernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="max-w-md w-full mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-medium">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 text-black"
              placeholder="Enter your username"
              value={username}
              onChange={handleusernameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
