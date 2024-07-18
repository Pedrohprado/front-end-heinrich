import { useContext } from 'react';
import { listRegisterByUser } from '../api/api';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';
import ListRegisterForUser from '../components/listsOfRegisters/listregisterbyuser';
import { useQuery } from '@tanstack/react-query';

const Registers = () => {
  const { isId } = useContext(GlobalContext);

  const { data, isLoading } = useQuery({
    queryKey: ['registersbyuser'],
    queryFn: () => listRegisterByUser(isId),
  });

  return (
    <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900 relative'>
      <h1 className=' font-bold text-lg mb-5'>Meus registros</h1>
      {isLoading ? <div>carregando...</div> : null}
      {data && data.length > 0 && !isLoading ? (
        <ListRegisterForUser isRegisters={data} />
      ) : (
        'você não tem nenhum registro'
      )}
      <div className=' fixed bottom-5 right-0 w-full z-10 flex'>
        <Link
          to={'/novoregistro'}
          className=' bottom-5 m-auto bg-slate-300 rounded-full p-3'
        >
          <FaPlus />
        </Link>
      </div>
    </main>
  );
};

export default Registers;
