//I need created a new inputs for register, when, i register why staff validated register, and add new inputs for ambulatório
import { useContext } from 'react';
import { getRegisterById } from '../api/api';
import { IoIosArrowBack } from 'react-icons/io';
import Tag from './tag';
import { GlobalContext } from '../globalcontext/globalcontext';
import FormValidationAmbulatory from './forms/formvalidationambulatory';
import FormValidationTst from './forms/formvalidationtst';
import { useQuery } from '@tanstack/react-query';

const CheckRegister = ({
  setPageValidation,
  isIdRegister,
}: {
  setPageValidation: (isPageValidation: boolean) => void;
  isIdRegister: number | null;
}) => {
  const { isRole } = useContext(GlobalContext);

  const { data } = useQuery({
    queryKey: ['registerinformations'],
    queryFn: () => getRegisterById(isIdRegister),
  });

  return (
    <section className=' w-full h-full fixed top-0 right-0 flex items-center justify-center bg-opacity-65 z-40 bg-zinc-700'>
      <div className=' w-[90%] h-[90%] rounded bg-white flex flex-col p-4'>
        <button
          onClick={() => setPageValidation(false)}
          className='  flex items-center  p-1'
        >
          <IoIosArrowBack size={22} />
        </button>
        {data && (
          <div className=' w-full mt-2 flex flex-col gap-2'>
            <Tag level={data.nivelDoOcorrido} />
            <p>{data.descricao}</p>
          </div>
        )}

        {data && isRole === 'STAFFTST' ? (
          <FormValidationTst idRegister={data.id} />
        ) : null}

        {data && isRole === 'STAFFAMBULATORY' ? (
          <FormValidationAmbulatory idRegister={data.id} />
        ) : null}
      </div>
    </section>
  );
};

export default CheckRegister;
