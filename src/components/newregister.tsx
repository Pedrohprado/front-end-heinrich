import { useState } from 'react';
import { createdNewRegister } from '../api/api';
import { useNavigate } from 'react-router-dom';

const NewRegister = () => {
  const [isName, setName] = useState<string>('');
  const [isCard, setCard] = useState<string>('');
  const [isSector, setSector] = useState<string>('');
  const [isResponsibleLeader, setResponsibleLeader] = useState<string>('');
  const [isLevelWhatHappened, setLevelWhatHappened] = useState<string>('');
  const [isDescription, setDescription] = useState<string>('');

  const [isError, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (
      isName &&
      isCard &&
      isSector &&
      isResponsibleLeader &&
      isLevelWhatHappened &&
      isDescription
    ) {
      const form = {
        nome: isName,
        cartao: isCard,
        setor: isSector,
        liderResponsavel: isResponsibleLeader,
        nivelDoOcorrido: isLevelWhatHappened,
        descricao: isDescription,
      };
      console.log(form);
      const status = await createdNewRegister(form);

      if (status.warning) setError(status.warning);

      if (status.warning === 'novo registro criado com sucesso!') navigate('/');
    } else {
      setError('Preencha todos os campos');
    }
  }

  return (
    <main className=' w-full h-screen p-10 flex flex-col text-zinc-900'>
      <h1 className='font-bold text-xl mb-5'>Registrar novo ocorrido</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
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
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Setor
          <input
            value={isSector}
            onChange={(event) => setSector(event.target.value)}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Lider responsável
          <input
            value={isResponsibleLeader}
            onChange={(event) => setResponsibleLeader(event.target.value)}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Nível do ocorrido
          <select
            className=' px-2 py-3 border rounded-md font-light'
            onChange={(event) => setLevelWhatHappened(event.target.value)}
          >
            <option value='qual o nível do ocorrido?' hidden></option>
            <option value='ato inseguro'>ato inseguro</option>
            <option value='condição insegura'>condição insegura</option>
            <option value='quase acidente'>quase acidente</option>
            <option value='primeiros socorros'>primeiros socorros</option>
            <option value='acidente leve'>ato inseguro</option>
            <option value='acidente moderado'>acidente moderado</option>
            <option value='acidente grave'>acidente grave</option>
            <option value='fatalidade'>fatalidade</option>
          </select>
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Descrição
          <input
            value={isDescription}
            onChange={(event) => setDescription(event.target.value)}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <button className='bg-blue-900 rounded-md w-full py-2 text-white font-semibold'>
          registrar
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

export default NewRegister;
