import { FaCheck, FaCircleNotch } from 'react-icons/fa';

import { TypeRegister } from '../types/typesRegisters';
import React, { useState } from 'react';
import CheckRegister from './checkregister';
import Tag from './tag';

interface Props {
  isRegisters: TypeRegister[];
  authorized: number | null; // Definindo a propriedade isRegisters como um array de TypeRegister
}

const ListRegisters: React.FC<Props> = ({ isRegisters, authorized }) => {
  const [isPageValidation, setPageValidation] = useState<boolean>(false);
  const [isId, setId] = useState<number | null>(null);

  function handleValidation(id: number) {
    setId(id);
    setPageValidation(true);
  }

  if (isPageValidation)
    return <CheckRegister setPageValidation={setPageValidation} isId={isId} />;
  if (isRegisters && authorized) {
    return (
      <>
        {isRegisters.map((register: TypeRegister) => (
          <section
            key={register.id}
            className=' rounded-md border w-full p-3 flex flex-col gap-5'
          >
            <div className=' flex items-center justify-between gap-2'>
              <Tag level={register.nivelDoOcorrido} />
              <p className=' text-sm font-medium'>
                {new Date(register.createdAt).toLocaleDateString('pt-br')}
              </p>
            </div>
            <p>{register.descricao}</p>
            <div className=' flex items-center justify-between gap-2'>
              <p className=''>{register.setor}</p>

              <div className=' flex items-center gap-5'>
                <button className=' bg-red-200 text-red-700 py-1 px-2 rounded'>
                  deletar
                </button>
                <button
                  className='bg-orange-200 text-orange-700 py-1 px-2 rounded'
                  onClick={() => handleValidation(register.id)}
                >
                  validar
                </button>
              </div>
            </div>
          </section>
        ))}
      </>
    );
  }

  if (isRegisters && !authorized) {
    return (
      <>
        {isRegisters.map((register: TypeRegister) => (
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
        ))}
      </>
    );
  }
};

export default ListRegisters;
