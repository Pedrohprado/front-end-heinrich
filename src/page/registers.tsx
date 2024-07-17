import { useContext, useEffect, useState } from 'react';
import { listRegisterByUser } from '../api/api';
import { TypeRegister } from '../types/typesRegisters';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';
import ListRegisterForUser from '../components/listsOfRegisters/listregisterbyuser';

const Registers = () => {
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);

  const { isId } = useContext(GlobalContext);

  useEffect(() => {
    const getAllRegisters = async () => {
      const token = localStorage.getItem('token');

      if (isId && token) {
        const data = await listRegisterByUser(isId, token);
        setRegisters(data);
        console.log(data);
      }
    };

    getAllRegisters();
  }, [isId]);

  return (
    <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900 relative'>
      <h1 className=' font-bold text-lg mb-5'>Meus registros</h1>
      {isRegisters && isRegisters.length > 0 ? (
        <ListRegisterForUser isRegisters={isRegisters} />
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
