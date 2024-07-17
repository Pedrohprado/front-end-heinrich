import { createdNewRegister } from '../api/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';
import MessageValidation from '../components/messagevalidation';

const registerInformationSchema = z.object({
  nivelDoOcorrido: z.string(),
  nome: z.string().min(4, 'preencha o campo nome'),
  cartao: z.string().min(4, 'preencha o campo cartão'),
  setor: z.string().min(4, 'preencha o campo setor'),
  liderResponsavel: z.string().min(4, 'preencha o campo lider'),
  descricao: z.string().min(5, 'descreva o ocorrido'),
});

type TypeRegister = z.infer<typeof registerInformationSchema>;

const NewRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeRegister>({
    mode: 'onChange',
    resolver: zodResolver(registerInformationSchema),
  });

  const [isMensage, setMensage] = useState<string | null>(null);

  const { isId } = useContext(GlobalContext);

  async function sendRegister(data: TypeRegister) {
    console.log(data);
    const token = localStorage.getItem('token');

    if (token && isId) {
      const info = await createdNewRegister(isId, token, data);
      console.log(info);
      if (info.warning === 'novo registro criado com sucesso!') {
        setMensage(info.warning);
      }
    }
  }

  return (
    <main className=' w-full h-screen p-10 pt-[20%] flex flex-col text-zinc-900'>
      {isMensage && (
        <MessageValidation isMenssage={isMensage} setMenssage={setMensage} />
      )}
      <h1 className='font-bold text-xl mb-5'>Registrar novo ocorrido</h1>
      <form
        onSubmit={handleSubmit(sendRegister)}
        className='flex flex-col gap-6'
      >
        <label className=' flex flex-col font-medium text-sm gap-1'>
          possível nível do ocorrido
          <select
            {...register('nivelDoOcorrido')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='ato inseguro'>ato inseguro</option>
            <option value='condição insegura'>condição insegura</option>
            <option value='quase acidente'>quase acidente</option>
            <option value='primeiros socorros'>primeiros socorros</option>
            <option value='acidente leve'>ato inseguro</option>
            <option value='acidente moderado'>acidente moderado</option>
            <option value='acidente grave'>acidente grave</option>
            <option value='fatalidade'>fatalidade</option>
          </select>
          {errors.nivelDoOcorrido && <p>{errors.nivelDoOcorrido.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Nome
          <input
            {...register('nome')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            {...register('cartao')}
            type='number'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.cartao && <p>{errors.cartao.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Setor
          <input
            {...register('setor')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.setor && <p>{errors.setor.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Lider responsável
          <input
            {...register('liderResponsavel')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.liderResponsavel && <p>{errors.liderResponsavel.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Descrição
          <input
            {...register('descricao')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.descricao && <p>{errors.descricao.message}</p>}
        </label>
        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? ' bg-slate-300' : 'bg-blue-900'
          } rounded-md w-full py-2 text-white font-semibold`}
        >
          {isSubmitting ? 'enviando' : 'registrar'}
        </button>
      </form>
    </main>
  );
};

export default NewRegister;
