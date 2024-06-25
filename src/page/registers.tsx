import { useContext, useEffect, useState } from 'react';
import { url } from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';
import { TypeRegister } from '../types/typesRegisters';

import { FaCheck, FaCircleNotch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Registers = () => {
  const { isLogin } = useContext(GlobalContext);
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);

  useEffect(() => {
    const getAllRegisters = async () => {
      try {
        const response = await fetch(`${url}/showallregister`);
        const data = await response.json();
        setRegisters(data);
        console.log(data);
        console.log('n');
      } catch (error) {
        console.log('erro ao fazer login', error);
      }
    };

    getAllRegisters();
  }, [isLogin]);
  return (
    <main className=' w-full h-screen p-10 flex flex-col text-zinc-900'>
      <h1 className=' font-bold text-xl mb-5'>Registros</h1>
      {isRegisters
        ? isRegisters.map((register: TypeRegister) => (
            <section
              key={register.id}
              className=' rounded-md border w-full p-3 flex flex-col gap-5'
            >
              <div className=' flex items-center justify-between gap-2'>
                <p
                  className={`${
                    register.nivelDoOcorrido === 'ato inseguro'
                      ? ' border-green-950 bg-green-200 text-green-900'
                      : register.nivelDoOcorrido === 'condição insegura'
                      ? ' border-green-700 bg-green-200 text-green-900'
                      : register.nivelDoOcorrido === 'quase acidente'
                      ? ' border-green-600 bg-green-200 text-green-900'
                      : register.nivelDoOcorrido === 'primeiros socorros'
                      ? ' border-yellow-600 bg-yellow-200 text-yellow-900'
                      : register.nivelDoOcorrido === 'acidente leve'
                      ? ' border-orange-500 bg-orange-200 text-orange-900'
                      : register.nivelDoOcorrido === 'acidente moderado'
                      ? ' border-red-500 bg-red-200 text-red-900'
                      : register.nivelDoOcorrido === 'acidente grave'
                      ? ' border-red-600 bg-red-200 text-red-900'
                      : register.nivelDoOcorrido === 'fatalidade'
                      ? ' border-red-800 bg-red-200 text-red-900'
                      : ''
                  } w-full flex justify-center items-center rounded-md font-medium`}
                >
                  {register.nivelDoOcorrido}
                </p>
                <p className=' text-sm font-medium'>
                  {new Date(register.createdAt).toLocaleDateString('pt-br')}
                </p>
              </div>
              <p>{register.descricao}</p>
              <div className=' flex items-center justify-between gap-2'>
                <p className=''>{register.setor}</p>
                <div
                  className={`${
                    register.validadorId
                      ? ' border-green-950 bg-green-200 text-green-900'
                      : ' border-yellow-600 bg-yellow-200 text-yellow-900 '
                  } p-2 rounded-md`}
                >
                  {register.validadorId ? (
                    <FaCheck />
                  ) : (
                    <div className='animate-spin transition'>
                      <FaCircleNotch />
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))
        : 'nenhum registro!'}

      <div className=' fixed bottom-5 right-0 w-full z-10  flex'>
        <Link
          to={'/register/validation'}
          className=' bottom-5 m-auto bg-slate-300 rounded-full p-3'
        >
          <FaPlus />
        </Link>
      </div>
    </main>
  );
};

export default Registers;
