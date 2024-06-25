import React, { useContext, useEffect, useState } from 'react';
import { loginStaff } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';

const Login = () => {
  const [isName, setName] = useState<string>('');
  const [isCard, setCard] = useState<string>('');
  const [isPassword, setPassword] = useState<string>('');

  const [isError, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isLogin, setUser, setCardNumber, setId, setToken, setLogin } =
    useContext(GlobalContext);

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin, navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (isName && isCard && isPassword) {
      const data = await loginStaff(isName, isCard, isPassword);

      if (data.warning) {
        setError(data.warning);
      }

      if (data.token) {
        setError(null);
        setUser(isName);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setCardNumber(data.staff.cartao);
        setId(data.staff.id);
        setLogin(true);
        navigate('/');
      }
    } else {
      setError('Preencha todos os campos');
    }
  }

  return (
    <main className='w-full h-screen px-10 py-24 flex flex-col text-zinc-900'>
      <h1 className='font-bold text-xl mb-5'>Login Staff</h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Nome
          <input
            value={isName}
            onChange={(event) => setName(event.target.value)}
            type='text'
            className='px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            value={isCard}
            onChange={(event) => setCard(event.target.value)}
            type='number'
            className='px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Senha
          <input
            value={isPassword}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            className='px-2 py-3 border rounded-md font-light'
          />
        </label>
        <button className='bg-green-900 rounded-md w-full py-2 text-white font-semibold'>
          Login
        </button>
      </form>

      {isError && (
        <div className='opacity-0 translate-x-[-100px] animate-animationleft w-full shadow mt-10 flex items-center justify-center border-l-2 border-yellow-600 py-4'>
          {isError}
        </div>
      )}
    </main>
  );
};

export default Login;
