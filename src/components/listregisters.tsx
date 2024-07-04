import { FaCheck, FaCircleNotch } from 'react-icons/fa';

import { TypeRegister } from '../types/typesRegisters';
import { useState } from 'react';
import CheckRegister from './checkregister';
import Tag from './tag';

interface Props {
  isRegisters: TypeRegister[];
  authorized: number | null;
}

const ListRegisters = ({ isRegisters, authorized }: Props) => {
  const [isPageValidation, setPageValidation] = useState<boolean>(false);
  const [isIdRegister, setIdRegister] = useState<number | null>(null);

  function handleValidation(id: number) {
    setIdRegister(id);
    setPageValidation(true);
  }

  if (isPageValidation)
    return (
      <CheckRegister
        setPageValidation={setPageValidation}
        isIdRegister={isIdRegister}
      />
    );
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
              <Tag level={register.nivelDoOcorrido} />

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
