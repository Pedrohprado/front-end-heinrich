import React, { useContext, useState } from 'react';
import { loginStaff } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';

const Login = () => {
  const [isName, setName] = useState<string>('');
  const [isCard, setCard] = useState<string | number>('');
  const [isPassword, setPassword] = useState<string>('');

  const [isError, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setUser, setCardNumber, setToken } = useContext(GlobalContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (isName && isCard && isPassword) {
      const data = await loginStaff(isName, isCard, isPassword);
      console.log(data);

      if (data.warning) setError(data.warning);

      if (data.token) {
        setError(null);
        setUser(isName);
        setToken(data.token);
        setCardNumber(data.staff.cartao);
        navigate('/home');
      }
    } else {
      setError('preencha todas os campos');
    }
  }

  return (
    <main className=' w-full h-screen px-10 py-24 flex flex-col text-zinc-900'>
      <h1 className=' font-bold text-xl mb-5'>Login Staff</h1>
      <form className=' flex flex-col gap-6' onSubmit={handleSubmit}>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Nome
          <input
            value={isName}
            onChange={(event) => setName(event.target.value)}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            value={isCard}
            onChange={(event) => setCard(event.target.value)}
            type='number'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Senha
          <input
            value={isPassword}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <button className=' bg-green-900 rounded-md w-full py-2 text-white font-semibold'>
          login
        </button>
      </form>

      {isError ? <div>{isError}</div> : null}
    </main>
  );
};

export default Login;
