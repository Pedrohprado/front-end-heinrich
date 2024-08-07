import { useState } from 'react';
import Body from '../svg/body';
import { BodyPart } from '../../types/typesRegisters';

const SliceOfBody = ({
  BodyParts,
}: {
  BodyParts: {
    id: number;
    parte: BodyPart;
    registerId: number;
  }[];
}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const circles: {
    cabeça: { x: number; y: number; width: number; height: number };
    olhos: { x: number; y: number; width: number; height: number };
    'mão direita': { x: number; y: number; width: number; height: number };
    'mão esquerda': { x: number; y: number; width: number; height: number };
    'pé direito': { x: number; y: number; width: number; height: number };
    'pé esquerdo': { x: number; y: number; width: number; height: number };
    tronco: { x: number; y: number; width: number; height: number };
    'braço direito': { x: number; y: number; width: number; height: number };
    'braço esquerdo': { x: number; y: number; width: number; height: number };
  } = {
    cabeça: { x: 19, y: 1, width: 24, height: 21 },
    olhos: { x: 19, y: 7, width: 23, height: 8 },
    'mão esquerda': { x: 42, y: 49, width: 30, height: 30 },
    'mão direita': { x: 5, y: 49, width: 30, height: 30 },
    'pé esquerdo': { x: 32, y: 95, width: 30, height: 30 },
    'pé direito': { x: 16, y: 95, width: 30, height: 30 },
    tronco: { x: 14, y: 18, width: 45, height: 90 },
    'braço esquerdo': { x: 33, y: 22, width: 20, height: 70 },
    'braço direito': { x: 6, y: 22, width: 20, height: 70 },
  };

  function mouseEnter() {
    setActive(!isActive);
  }

  return (
    <div className='relative w-full max-w-sm mx-auto'>
      <Body />
      {BodyParts &&
        BodyParts.map((item) => (
          <div
            key={item.id}
            onClick={mouseEnter}
            className=' z-10 absolute rounded-full bg-red-500 opacity-75'
            style={{
              left: `${circles[item.parte].x}%`,
              top: `${circles[item.parte].y}%`,
              width: circles[item.parte].width,
              height: circles[item.parte].height,
              transform: `${
                item.parte === 'braço direito'
                  ? 'rotate(10deg)'
                  : item.parte === 'braço esquerdo'
                  ? 'rotate(-10deg)'
                  : 'rotate(0deg)'
              } `,
            }}
          >
            {isActive ? (
              <div
                style={{
                  opacity: 100,
                  transform: 'rotate(0deg)',
                }}
                className=' opacity-100 bottom-[0%] left-[100%] fixed bg-slate-100 rounded p-2 flex'
              >
                {item.parte}
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default SliceOfBody;
