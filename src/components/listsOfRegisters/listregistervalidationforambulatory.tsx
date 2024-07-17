import { useState } from 'react';
import { TypeRegister } from '../../types/typesRegisters';
import Tag from '../tag';
import CheckRegister from '../checkregister';

const ListRegisterAmbulatory = ({
  isRegisters,
}: {
  isRegisters: TypeRegister[];
}) => {
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

  if (!isPageValidation)
    return (
      <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900'>
        <p>registros para validação ambulatório</p>
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
                {/* deletar ainda não tem uma function */}
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
      </main>
    );
};

export default ListRegisterAmbulatory;
