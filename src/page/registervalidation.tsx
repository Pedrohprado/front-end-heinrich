import { useContext, useEffect, useState } from 'react';
import ListRegisters from '../components/listregisters';
import { TypeRegister } from '../types/typesRegisters';
import { url } from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';

function RegisterValidation() {
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);
  const { isId, isRole } = useContext(GlobalContext);

  useEffect(() => {
    const getAllRegisters = async () => {
      if (isRole === 'STAFFAMBULATORY') {
        try {
          const response = await fetch(
            `${url}/ambulatory/showallregister/${isId}`
          );
          const register = await response.json();
          setRegisters(register);
        } catch (error) {
          console.log(error);
        }
      }
      if (isRole === 'STAFFTST') {
        console.log(isRole);
        try {
          const response = await fetch(`${url}/tst/showallregister/${isId}`);
          const register = await response.json();
          setRegisters(register);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getAllRegisters();
  }, [isId, isRole]);
  return (
    <main className=' w-full h-screen p-10 pt-[20%] flex flex-col text-zinc-900'>
      <h1 className=' font-bold text-xl mb-5'>Registros para validação</h1>
      {isRegisters ? (
        <ListRegisters isRegisters={isRegisters} authorized={isId} />
      ) : (
        'sem registros no momento'
      )}
    </main>
  );
}

export default RegisterValidation;
