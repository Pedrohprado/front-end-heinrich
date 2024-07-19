import { TypeRegister } from '../../types/typesRegisters';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const DotsNextAndPrev = ({
  prevSlide,
  register,
  nextSlide,
  active,
}: {
  register: TypeRegister[];
  active: number;
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  return (
    <>
      {register.length > 1 && (
        <div className=' relative flex justify-between mt-2'>
          <button
            className=' text-white font-bold p-2 flex items-center justify-center rounded bg-slate-600'
            onClick={prevSlide}
          >
            <IoIosArrowBack />
          </button>
          <nav className=' flex items-center justify-center gap-1'>
            {register.map((dots: TypeRegister, index) => (
              <div
                key={dots.id}
                className={`w-2 h-1 ${
                  active === index ? 'bg-emerald-500' : 'bg-slate-200'
                }  rounded`}
              ></div>
            ))}
          </nav>

          <button
            className=' text-white font-bold p-2 flex items-center justify-center rounded bg-slate-600'
            onClick={nextSlide}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </>
  );
};

export default DotsNextAndPrev;
