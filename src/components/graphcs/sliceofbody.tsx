import { useState } from 'react';
import Body from '../svg/body';
import { BodyPart } from '../../types/typesRegisters';

const SliceOfBody = ({
  BodyParts,
}: {
  BodyParts: {
    id: number;
    parte: BodyPart[];
    registerId: number;
  }[];
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  // const data = {
  //   cabeca: 25,
  //   'mão direita': 60,
  //   'mão esquerda': 60,
  //   'pé direito': 60,
  //   'pé esquerdo': 60,
  //   tronco: 120,
  //   'braço direito': 100,
  //   'braço esquerdo': 90,
  // };

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
    cabeça: { x: 23.5, y: 5, width: 24, height: 21 },
    olhos: { x: 19, y: 7, width: 23, height: 8 },
    'mão esquerda': { x: 42, y: 49, width: 30, height: 30 },
    'mão direita': { x: 5, y: 49, width: 30, height: 30 },
    'pé esquerdo': { x: 32, y: 95, width: 30, height: 30 },
    'pé direito': { x: 16, y: 95, width: 30, height: 30 },
    tronco: { x: 14, y: 18, width: 45, height: 90 },
    'braço esquerdo': { x: 33, y: 22, width: 20, height: 70 },
    'braço direito': { x: 6, y: 22, width: 20, height: 70 },
  };

  // const getCircleSize = (value) => {
  //   // Define um tamanho máximo para o círculo
  //   const maxSize = 100; // Tamanho máximo do círculo em pixels

  //   // Calcula o tamanho proporcional com base no valor
  //   // Ajuste o divisor conforme necessário para escalar o tamanho
  //   const proportionalSize = value / 2; // Proporção para escalonar o tamanho

  //   // Retorna o menor valor entre o tamanho proporcional e o tamanho máximo
  //   return Math.min(proportionalSize, maxSize);
  // };
  function mouseEnter() {
    setActive(!isActive);
  }

  return (
    <div className='relative w-full max-w-sm mx-auto'>
      <Body />
      {BodyParts &&
        BodyParts.map((item) => (
          <div key={item.id}>
            {item.parte.map((part, index) => (
              <div
                key={index}
                onClick={mouseEnter}
                className=' z-10 absolute rounded-full bg-red-500 opacity-75'
                style={{
                  left: `${circles[part].x}%`,
                  top: `${circles[part].y}%`,
                  width: circles[part].width,
                  height: circles[part].height,
                  transform: `${
                    part === 'braço direito'
                      ? 'rotate(10deg)'
                      : part === 'braço esquerdo'
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
                    {part}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SliceOfBody;
