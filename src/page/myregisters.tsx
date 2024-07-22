import { useContext } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';
import { useQuery } from '@tanstack/react-query';
import { listRegisterByUser } from '../api/api';
import ListRegisterForUser from '../components/listsOfRegisters/listregisterbyuser';

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
    </main>
  );
};

export default MyRegisters;
