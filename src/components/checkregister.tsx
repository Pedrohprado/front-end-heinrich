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

const CheckRegister = ({
  setPageValidation,
  isId,
}: {
  setPageValidation: (isPageValidation: boolean) => void;
  isId: number | null;
}) => {
  const [isOpenList, setOpenList] = useState<number | null>(null);

  const toggleList = (barNumber: number) => {
    if (isOpenList == barNumber) {
      setOpenList(null);
    } else {
      setOpenList(barNumber);
    }
  };
  useEffect(() => {
    async function getUniqueRegisterById() {
      const response = await fetch(`${url}/showuniqueregister/${isId}`);
      const data = await response.json();
      console.log(data);
    }
    if (isId) getUniqueRegisterById();
  }, [isId]);
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
            className=' shadow-sm pb-2 flex items-center justify-around text-sm font-bold text-zinc-700'
            onClick={() => toggleList(1)}
          >
            <IoMdInformationCircle />
            informações
            <IoIosArrowForward />
          </button>
          {isOpenList === 1 && <div>informações</div>}
          <button
            className=' shadow-sm pb-2 flex items-center justify-around text-sm font-bold text-zinc-700'
            onClick={() => toggleList(2)}
          >
            <AiFillMedicineBox />
            ambulatório
            <IoIosArrowForward />
          </button>
          {isOpenList === 2 && <div>informações</div>}
          <button
            className=' shadow-sm pb-2 flex items-center justify-around text-sm font-bold text-zinc-700'
            onClick={() => toggleList(3)}
          >
            <FaHelmetSafety />
            segurança do trabalho
            <IoIosArrowForward />
          </button>
          {isOpenList === 3 && <div>informações</div>}
        </div>
      </div>
    </section>
  );
};

export default CheckRegister;
