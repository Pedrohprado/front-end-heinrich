import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../api/api';
import { useContext, useEffect } from 'react';

const loginFiltersSchema = z.object({
  nome: z.string().min(3, 'preencha o campo nome corretamente'),
  cartao: z.string().min(4, 'preencha o campo cartão corretamente'),
  password: z.string(),
});

type TypeLogin = z.infer<typeof loginFiltersSchema>;

interface TypeResult {
  id: number;
  cartao: string;
  nome: string;
  role: string;
  token: string;
  warning?: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TypeLogin>({
    mode: 'onChange',
    resolver: zodResolver(loginFiltersSchema),
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
        console.log(info);
      }
    } catch (error) {
      console.log(error);
      setError('root', {
        message: 'json que vem do back end',
      });
    }
  }

  return (
    <main className='w-full h-screen px-10 py-24 flex flex-col text-zinc-900'>
      <h1 className='font-bold text-xl mb-5'>Identificação</h1>
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
          {errors.nome && <p>{errors.nome.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            {...register('cartao')}
            type='text'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.cartao && <p>{errors.cartao.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Senha
          <input
            {...register('password')}
            type='password'
            className='px-2 py-3 border rounded-md font-light'
          />
        </label>
        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'bg-slate-300' : 'bg-green-900'
          } rounded-md w-full py-2 text-white font-semibold`}
        >
          {isSubmitting ? 'carregando...' : 'login'}
        </button>
        {errors.root && <p>{errors.root.message}</p>}
      </form>
    </main>
  );
};

export default Login;
