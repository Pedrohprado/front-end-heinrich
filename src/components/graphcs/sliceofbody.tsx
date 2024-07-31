import { useState } from 'react';
import Body from '../svg/body';
type BodyPart =
  | 'cabeca'
  | 'olhos'
  | 'mão direita'
  | 'mão esquerda'
  | 'pé direito'
  | 'pé esquerdo'
  | 'tronco'
  | 'braço direito'
  | 'braço esquerdo';

const SliceOfBody = ({ bodyPart }: { bodyPart: BodyPart }) => {
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
    cabeca: { x: number; y: number; width: number; height: number };
    olhos: { x: number; y: number; width: number; height: number };
    'mão direita': { x: number; y: number; width: number; height: number };
    'mão esquerda': { x: number; y: number; width: number; height: number };
    'pé direito': { x: number; y: number; width: number; height: number };
    'pé esquerdo': { x: number; y: number; width: number; height: number };
    tronco: { x: number; y: number; width: number; height: number };
    'braço direito': { x: number; y: number; width: number; height: number };
    'braço esquerdo': { x: number; y: number; width: number; height: number };
  } = {
    cabeca: { x: 57, y: 25, width: 20, height: 20 },
    olhos: { x: 58, y: 25, width: 23, height: 10 },
    'mão direita': { x: 102, y: 148, width: 20, height: 20 },
    'mão esquerda': { x: 12, y: 148, width: 20, height: 20 },
    'pé direito': { x: 77, y: 285, width: 20, height: 20 },
    'pé esquerdo': { x: 38, y: 285, width: 20, height: 20 },
    tronco: { x: 57, y: 100, width: 20, height: 20 },
    'braço direito': { x: 90, y: 100, width: 20, height: 20 },
    'braço esquerdo': { x: 25, y: 100, width: 20, height: 20 },
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
    <div className=' relative w-full max-w-sm mx-auto'>
      <Body />
      {bodyPart && (
        <div
          onClick={mouseEnter}
          className=' absolute rounded-full bg-red-500 opacity-75'
          style={{
            left: circles[bodyPart].x,
            top: circles[bodyPart].y,
            width: circles[bodyPart].width,
            height: circles[bodyPart].height,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      )}
      {isActive ? (
        <div className=' top-[10%] left-[20%] absolute bg-slate-100 rounded p-2 flex'>
          {bodyPart}
        </div>
      ) : null}
      {/* {Object.keys(data).map((part) => (
        <div
          key={part}
          className=' absolute rounded-full bg-red-500 opacity-50'
          style={{
            left: circles[part].x,
            top: circles[part].y,
            width: `${getCircleSize(data[part])}px`,
            height: `${getCircleSize(data[part])}px`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))} */}
    </div>
  );
};

export default SliceOfBody;
