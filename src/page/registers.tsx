import { useContext, useEffect, useState } from 'react';
import { url } from '../api/api';
import { TypeRegister } from '../types/typesRegisters';

import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListRegisters from '../components/listregisters';
import { GlobalContext } from '../globalcontext/globalcontext';

const Registers = () => {
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);

  const { isErrorGlobal, setErrorGlobal, isId } = useContext(GlobalContext);

  useEffect(() => {
    if (isErrorGlobal) {
      const teste = setTimeout(() => {
        setErrorGlobal(null);
      }, 10000);

      return () => clearTimeout(teste);
    }
  }, [isErrorGlobal, setErrorGlobal]);

  useEffect(() => {
    const getAllRegisters = async () => {
      try {
        const token = localStorage.getItem('token');
        // console.log(isId);
        // console.log(token);
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
      {isErrorGlobal ? (
        <p className='fixed top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 border rounded bg-white z-20'>
          {isErrorGlobal}
        </p>
      ) : null}
      <h1 className=' font-bold text-xl mb-5'>Registros</h1>
      {isRegisters ? (
        <ListRegisters isRegisters={isRegisters} authorized={null} />
      ) : (
        'sem registros no momento'
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
