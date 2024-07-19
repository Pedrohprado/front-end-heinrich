import { useEffect, useRef, useState } from 'react';
import { TypeRegister } from '../../types/typesRegisters';
import TitleStatusBar from './titlestatusbar';
import RegisterCard from './registercard';
import DotsNextAndPrev from './dotsnextandprev';

const Carousel = ({
  register,
  title,
}: {
  register: TypeRegister[];
  title: string;
}) => {
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(0);

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

  return (
    <section className='overflow-hidden'>
      <TitleStatusBar title={title} />

      <div className=' mt-2'>
        <RegisterCard
          register={register}
          position={position}
          contentRef={contentRef}
        />
        <DotsNextAndPrev
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          register={register}
          active={active}
        />
      </div>
    </section>
  );
};

export default Carousel;
