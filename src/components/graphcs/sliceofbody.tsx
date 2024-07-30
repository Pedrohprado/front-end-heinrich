import Body from '../svg/body';

const SliceOfBody = () => {
  const data = {
    cabeca: 25,
    'mão direita': 60,
    'mão esquerda': 60,
    'pé direito': 60,
    'pé esquerdo': 60,
    tronco: 120,
    'braço direito': 100,
    'braço esquerdo': 90,
  };

  const circles = {
    cabeca: { x: 57, y: 25 },
    'mão direita': { x: 102, y: 148 },
    'mão esquerda': { x: 12, y: 148 },
    'pé direito': { x: 77, y: 285 },
    'pé esquerdo': { x: 38, y: 285 },
    tronco: { x: 57, y: 100 },
    'braço direito': { x: 90, y: 100 },
    'braço esquerdo': { x: 25, y: 100 },
  };

  const getCircleSize = (value) => {
    // Define um tamanho máximo para o círculo
    const maxSize = 100; // Tamanho máximo do círculo em pixels

    // Calcula o tamanho proporcional com base no valor
    // Ajuste o divisor conforme necessário para escalar o tamanho
    const proportionalSize = value / 2; // Proporção para escalonar o tamanho

    // Retorna o menor valor entre o tamanho proporcional e o tamanho máximo
    return Math.min(proportionalSize, maxSize);
  };
  return (
    <div className=' relative w-full max-w-sm mx-auto'>
      <Body />
      {Object.keys(data).map((part) => (
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
      ))}
    </div>
  );
};

export default SliceOfBody;
