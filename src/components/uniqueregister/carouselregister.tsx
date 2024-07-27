import { useEffect, useRef, useState } from 'react';
import DotsNextAndPrev from '../carousel/dotsnextandprev';
import { IoTrash } from 'react-icons/io5';
import { deleteImgById } from '../../api/api';

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
    console.log(position);

    if (active < listImgs.length - 1) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  const prevSlide = () => {
    console.log(position);
    if (active > 0) {
      setActive(active - 1);
    } else {
      setActive(listImgs.length - 1);
    }
  };

  const deleteImg = async (id: number) => {
    const status = await deleteImgById(id);
    console.log(status);
  };
  return (
    <div className=' flex flex-col'>
      <div
        className=' transition w-full flex items-center'
        style={{ transform: `translateX(${position}px)` }}
        ref={contentRef}
      >
        {listImgs.map(
          (img: { id: number; path: string; registerId: number }) => (
            <div
              key={img.id}
              className=' flex w-full flex-shrink-0 rounded-md p-2 relative'
            >
              <img
                crossOrigin='anonymous'
                src={`http://localhost:8080/${img.path}`}
                alt='teste'
              />
              <button
                onClick={() => deleteImg(img.id)}
                className=' bg-red-200 text-red-600 p-2 rounded absolute top-[5%] left-[5%]'
              >
                <IoTrash />
              </button>
            </div>
          )
        )}
      </div>
      <DotsNextAndPrev
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        register={listImgs}
        active={active}
      />
    </div>
  );
};

export default CarouselRegister;
