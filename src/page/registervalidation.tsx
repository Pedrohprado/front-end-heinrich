import { useContext, useEffect, useState } from 'react';
import ListRegisters from '../components/listregisters';
import { TypeRegister } from '../types/typesRegisters';
import { url } from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';
import { useNavigate } from 'react-router-dom';

function RegisterValidation() {
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);
  const { isId, setErrorGlobal } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllRegisters = async () => {
      try {
        console.log(isId, 'oi');
        const response = await fetch(
          `${url}/showallregisterneedvalidation/${isId}`
        );
        const data = await response.json();

        if (data.error === 'acesso não autorizado') {
          setErrorGlobal(
            'você precisa ser um staff para verificar as validações'
          );
          navigate('/');
        }
        setRegisters(data);
        console.log(data);
      } catch (error) {
        console.log('erro ao fazer login', error);
      }
    };

    getAllRegisters();
  }, [isId, navigate, setErrorGlobal]);
  return (
    <main className=' w-full h-screen p-10 flex flex-col text-zinc-900'>
      <h1 className=' font-bold text-xl mb-5'>Registros para validação</h1>
      {isRegisters ? (
        <ListRegisters isRegisters={isRegisters} />
      ) : (
        'sem registros no momento'
      )}
    </main>
  );
}

export default RegisterValidation;
