// src/components/Login.tsx
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { RiGitRepositoryPrivateLine, RiMailLine } from 'react-icons/ri';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      login(username, password)
    } catch (error: any) {
      console.error('Error during login:', error);
      console.log('Error details:', error.response);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="bg-white w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-gray-900">Bienvenido</h1>
            <p className="text-gray-400 text-sm">
              Ingresa con tu correo electrónico y tu contraseña
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="relative">
              <input
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <RiMailLine className='w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500' />
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <RiGitRepositoryPrivateLine className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-blue-500" />
            </div>
            <div>
              <input
                type="submit"
                className="w-full bg-primary py-2 px-4 text-white rounded-md hover:bg-blue-600 transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
