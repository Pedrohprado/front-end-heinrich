import { useEffect, useRef, useState } from 'react';
import DotsNextAndPrev from '../carousel/dotsnextandprev';

const CarouselRegister = ({
  listImgs,
}: {
  listImgs: {
    id: number;
    path: string;
    registerId: number;
  }[];
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
    if (active < listImgs.length - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  const prevSlide = () => {
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(listImgs.length - 1);
    }
  };
  return (
    <>
      <div
        className=' transition w-full flex items-center'
        style={{ transform: `translateX(${position}px)` }}
      >
        {listImgs.map(
          (img: { id: number; path: string; registerId: number }) => (
            <img
              crossOrigin='anonymous'
              key={img.id}
              src={`http://localhost:8080/${img.path}`}
              alt='teste'
            />
          )
        )}
      </div>
      <DotsNextAndPrev
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        register={listImgs}
        active={active}
      />
    </>
  );
};

export default CarouselRegister;
