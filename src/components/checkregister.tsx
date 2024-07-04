//I need created a new inputs for register, when, i register why staff validated register, and add new inputs for ambulatório
import { useEffect, useState } from 'react';
import { url } from '../api/api';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdInformationCircle,
} from 'react-icons/io';

import { FaHelmetSafety } from 'react-icons/fa6';
import { AiFillMedicineBox } from 'react-icons/ai';
import { TypeRegister } from '../types/typesRegisters';
import Tag from './tag';
import { useNavigate } from 'react-router-dom';

const CheckRegister = ({
  setPageValidation,
  isId,
}: {
  setPageValidation: (isPageValidation: boolean) => void;
  isId: number | null;
}) => {
  const [isOpenList, setOpenList] = useState<number | null>(null);
  const [isRegister, setRegister] = useState<TypeRegister | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUniqueRegisterById() {
      const response = await fetch(`${url}/showuniqueregister/${isId}`);
      const data = await response.json();
      setRegister(data);
      console.log(data);
    }
    if (isId) getUniqueRegisterById();
  }, [isId]);

  const toggleList = (barNumber: number) => {
    if (isOpenList == barNumber) {
      setOpenList(null);
    } else {
      setOpenList(barNumber);
    }
  };

  const handleValidation = async () => {
    if (isRegister) {
      console.log(`${url}/validationregister/${isRegister.id}/${isId}`);
      const response = await fetch(
        `${url}/validationregister/${isRegister.id}/${isId}`,
        {
          method: 'PUT',
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        setPageValidation(false);
        navigate('/');
      }
      console.log(data);
    }
  };

  return (
    <section className=' w-full h-full fixed top-0 right-0 flex items-center justify-center bg-opacity-65 z-40 bg-zinc-700'>
      <div className=' w-[90%] h-[90%] rounded bg-white flex flex-col p-4'>
        <button
          onClick={() => setPageValidation(false)}
          className='  flex items-center justify-center p-1 fixed'
        >
          <IoIosArrowBack size={22} />
        </button>
        <div className='flex flex-col mt-10 gap-2'>
          <button
            className=' shadow-sm p-2 flex items-center justify-between text-sm font-bold text-zinc-700 w-full'
            onClick={() => toggleList(1)}
          >
            <span className='flex items-center justify-center gap-2'>
              <IoMdInformationCircle />
              informações
            </span>

            {isOpenList === 1 ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          {isOpenList === 1 && isRegister && (
            <div className=' opacity-0 translate-y-[-10px] animate-animationleft w-full flex flex-col p-2 gap-2'>
              <Tag level={isRegister.nivelDoOcorrido} />
              <div className=' flex items-center justify-between'>
                <p>{new Date(isRegister.createdAt).toLocaleDateString()}</p>
                <p>{isRegister.setor}</p>
              </div>
              <p className=' text-zinc-600'>{isRegister.descricao}</p>
            </div>
          )}
          <button
            className=' shadow-sm p-2 flex items-center justify-between text-sm font-bold text-zinc-700 w-full'
            onClick={() => toggleList(2)}
          >
            <span className='flex items-center justify-center gap-2'>
              <AiFillMedicineBox />
              ambulatório
            </span>

            {isOpenList === 2 ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          {isOpenList === 2 && (
            <div className=' opacity-0 translate-y-[-10px] animate-animationleft '>
              <p>
                informações necessárias para validar o campo do setor do
                ambulatório
              </p>
            </div>
          )}
          <button
            className=' shadow-sm p-2 flex items-center justify-between text-sm font-bold text-zinc-700 w-full'
            onClick={() => toggleList(3)}
          >
            <span className='flex items-center justify-center gap-2'>
              <FaHelmetSafety />
              segurança do trabalho
            </span>

            {isOpenList === 3 ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          {isOpenList === 3 && (
            <div className=' opacity-0 translate-y-[-10px] animate-animationleft w-full flex flex-col p-2 gap-2'>
              <p>
                informações necessárias para validar o campo do setor de
                segurança
              </p>
              <button
                onClick={handleValidation}
                className=' bg-blue-800 text-white py-1 rounded'
              >
                validar
              </button>
            </div>
            // <form className=' opacity-0 translate-y-[-10px] animate-animationleft w-full flex flex-col p-2 gap-2'>
            //   <label>
            //     <input type='text' />
            //   </label>
            // </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckRegister;
