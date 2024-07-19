import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../api/api';
import { useContext, useEffect } from 'react';
import { loginFilterSchema, TypeLogin } from '../services/zodschemas';
import { TypeResult } from '../types/typesLogin';
import ErrorMenssage from '../components/errormenssage';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TypeLogin>({
    mode: 'onChange',
    resolver: zodResolver(loginFilterSchema),
  });

  const navigate = useNavigate();

  const { isLogin, setId, setUser, setCardNumber, setRole, setLogin } =
    useContext(GlobalContext);

  useEffect(() => {
    if (isLogin) navigate('/');
  }, [isLogin, navigate]);

  async function sendLoginUser(data: TypeLogin) {
    try {
      const info: TypeResult = await loginUser(data);
      console.log(info);
      if (info.warning) setError('root', { message: info.warning });

      if (info.token) {
        localStorage.setItem('token', info.token);
        setUser(info.nome);
        setCardNumber(info.cartao);
        setId(info.id);
        setRole(info.role);
        setLogin(true);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setError('root', {
        message: 'erro ao tentar conctar-se com o servidor, tente novamente.',
      });
    }
  }

  return (
    <main className='w-screen h-screen px-5 py-20 flex flex-col justify-center text-stone-800 bg-emerald-100'>
      <div className=' w-full h-full bg-white rounded-xl flex flex-col justify-center p-5 '>
        <div className=' m-auto my-0 w-14 h-14 bg-emerald-950 rounded-xl'></div>
        <h1 className='font-bold text-lg py-6 text-center'>Acesse sua conta</h1>
        <form
          className='flex flex-col gap-6'
          onSubmit={handleSubmit(sendLoginUser)}
        >
          <label className='flex flex-col font-medium text-sm gap-1'>
            Nome
            <input
              {...register('nome')}
              type='text'
              className='px-2 py-3 border rounded-md font-light'
            />
            {errors.nome?.message && (
              <ErrorMenssage errormenssage={errors.nome.message} />
            )}
          </label>
          <label className='flex flex-col font-medium text-sm gap-1'>
            Cartão
            <input
              {...register('cartao')}
              type='text'
              className='px-2 py-3 border rounded-md font-light'
            />
            {errors.cartao?.message && (
              <ErrorMenssage errormenssage={errors.cartao.message} />
            )}
          </label>
          <label className='flex flex-col font-medium text-sm gap-1'>
            Senha
            <input
              {...register('password')}
              type='password'
              className='px-2 py-3 border rounded-md font-light'
            />
            {errors.password?.message && (
              <ErrorMenssage errormenssage={errors.password.message} />
            )}
          </label>
          <button className=' border-b w-[60%] m-auto text-sm'>
            esqueceu sua senha?
          </button>
          <button
            disabled={isSubmitting}
            className={`${
              isSubmitting ? 'bg-slate-300' : 'bg-zinc-900'
            } rounded-md w-full py-2 text-white font-semibold`}
          >
            {isSubmitting ? 'carregando...' : 'continuar'}
          </button>
          {errors.root?.message && (
            <ErrorMenssage errormenssage={errors.root.message} />
          )}
        </form>
      </div>
    </main>
  );
};

export default Login;
