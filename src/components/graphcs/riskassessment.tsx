const RiskAssessment = ({
  probability,
  gravity,
}: {
  probability: number;
  gravity: number;
}) => {
  const gridSize = 5;
  const cells = [];

  for (let row = 1; row < gridSize; row++) {
    for (let col = 1; col < gridSize; col++) {
      const cellKey = row * col;

      cells.push(
        <div
          className={`${
            row === probability && col === gravity && cellKey === 1
              ? 'bg-green-500 text-white'
              : row === probability && col === gravity && cellKey === 2
              ? 'bg-green-500 text-white'
              : row === probability && col === gravity && cellKey === 3
              ? 'bg-yellow-500 text-white'
              : row === probability && col === gravity && cellKey === 4
              ? 'bg-yellow-500 text-white'
              : row === probability && col === gravity && cellKey === 6
              ? 'bg-orange-500 text-white'
              : row === probability && col === gravity && cellKey === 8
              ? 'bg-orange-500 text-white'
              : row === probability && col === gravity && cellKey === 9
              ? 'bg-orange-500 text-white'
              : row === probability && col === gravity && cellKey === 12
              ? 'bg-red-500 text-white'
              : row === probability && col === gravity && cellKey === 16
              ? 'bg-red-500 text-white'
              : ' bg-white'
          } flex items-center justify-center text-sm font-semibold border h-9`}
          key={Math.random()}
        >
          {cellKey}
        </div>
      );
    }
  }
  return (
    <div className=' rounded overflow-hidden grid grid-cols-4'>{cells}</div>
  );
};

export default RiskAssessment;
