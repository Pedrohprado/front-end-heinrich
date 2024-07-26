import { useEffect, useRef, useState } from 'react';
import { TypeRegister } from '../../types/typesRegisters';
import AllInformationsByRegister from '../uniqueregister/allinfobyregister';
import DotsNextAndPrev from './dotsnextandprev';

const RegisterCard = ({
  status,
  register,
}: {
  register: TypeRegister[];
  status: string;
}) => {
  const [isModalInformations, setModalInformations] = useState<boolean>(false);
  const [isIdRegister, setIdRegister] = useState<number | null>(null);

  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(0);

  function handleClick(idRegister: number) {
    setIdRegister(idRegister);
    setModalInformations(true);
  }

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const { width } = contentRef.current.getBoundingClientRect();
      setPosition(-(width * active));
    }
  }, [active]);

  const nextSlide = () => {
    if (active < register.length - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  const prevSlide = () => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(register.length - 1);
    }
  };

  if (isModalInformations && isIdRegister)
    return (
      <AllInformationsByRegister
        setModalInformations={setModalInformations}
        idRegister={isIdRegister}
        status={status}
      />
    );

  return (
    <div className='flex flex-col'>
      <div
        className=' transition w-full flex items-center '
        style={{ transform: `translateX(${position}px)` }}
        ref={contentRef}
      >
        {register.map((register: TypeRegister) => (
          <div
            onClick={() => handleClick(register.id)}
            key={register.id}
            className=' bg-white rounded-md border p-2 flex-shrink-0 w-full flex flex-col gap-2'
          >
            <div className=' flex items-center justify-between gap-2'>
              <p className=' text-sm font-medium'>
                {new Date(register.createdAt).toLocaleDateString('pt-br')}
              </p>
            </div>
            <div className=' flex items-center justify-between gap-2'>
              <p className=' text-sm'>{register.setor}</p>
            </div>
          </div>
        ))}
      </div>
      <DotsNextAndPrev
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        register={register}
        active={active}
      />
    </div>
  );
};

export default RegisterCard;
