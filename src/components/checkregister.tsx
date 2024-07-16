//I need created a new inputs for register, when, i register why staff validated register, and add new inputs for ambulatório
import { useContext, useEffect, useState } from 'react';
import { url } from '../api/api';
import { IoIosArrowBack } from 'react-icons/io';

import { TypeRegister } from '../types/typesRegisters';
import Tag from './tag';
import { GlobalContext } from '../globalcontext/globalcontext';
import FormValidationAmbulatory from './formvalidationambulatory';

const CheckRegister = ({
  setPageValidation,
  isIdRegister,
}: {
  setPageValidation: (isPageValidation: boolean) => void;
  isIdRegister: number | null;
}) => {
  const [isRegister, setRegister] = useState<TypeRegister | null>(null);

  const { isRole } = useContext(GlobalContext);

  useEffect(() => {
    async function getUniqueRegisterById() {
      const response = await fetch(
        `${url}/register/showuniqueregister/${isIdRegister}`
      );
      const data = await response.json();
      setRegister(data);
      console.log(data);
    }
    if (isIdRegister) getUniqueRegisterById();
  }, [isIdRegister]);

  return (
    <section className=' w-full h-full fixed top-0 right-0 flex items-center justify-center bg-opacity-65 z-40 bg-zinc-700'>
      <div className=' w-[90%] h-[90%] rounded bg-white flex flex-col p-4'>
        <button
          onClick={() => setPageValidation(false)}
          className='  flex items-center  p-1'
        >
          <IoIosArrowBack size={22} />
        </button>
        {isRegister && (
          <div className=' w-full mt-2 flex flex-col gap-2'>
            <Tag level={isRegister.nivelDoOcorrido} />
            <p>{isRegister.descricao}</p>
          </div>
        )}

        {isRegister && isRole === 'STAFFAMBULATORY' ? (
          <FormValidationAmbulatory idRegister={isRegister.id} />
        ) : null}
      </div>
    </section>
  );
};

export default CheckRegister;
