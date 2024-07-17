import { useContext, useEffect, useState } from 'react';
import { url } from '../api/api';
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
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          `${url}/register/showregisterbyuser/${isId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setRegisters(data);
        console.log(data);
      } catch (error) {
        console.log('erro ao fazer login', error);
      }
    };

    getAllRegisters();
  }, [isId]);

  return (
    <main className=' w-full h-screen p-10 pt-[20%] flex flex-col text-zinc-900 relative'>
      <h1 className=' font-bold text-xl mb-5'>Meus registros</h1>
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
