import { useContext } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';
import { useQuery } from '@tanstack/react-query';
import { listRegisterByUser } from '../api/api';
import ListRegisterForUser from '../components/listsOfRegisters/listregisterbyuser';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const MyRegisters = () => {
  const { isId } = useContext(GlobalContext);

  const { data, isLoading } = useQuery({
    queryKey: ['registersbyuser'],
    queryFn: () => listRegisterByUser(isId),
  });

  return (
    <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900 relative'>
      <h1 className=' font-bold text-lg my-4'>Meus registros</h1>
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

export default MyRegisters;
