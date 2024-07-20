const TitleStatusBar = ({ title }: { title: string }) => {
  return (
    <>
      <h2 className=' text-sm font-bold'>{title}</h2>
      {title === 'finalizados' && (
        <div className=' mt-1.5 mb-5 flex gap-2 items-center'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='w-10 h-1 bg-emerald-600 rounded-sm'
            ></div>
          ))}
        </div>
      )}

      {title === 'validados pelo ambulatório' && (
        <div className=' mt-1.5 mb-5 flex gap-2 items-center'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className='w-10 h-1 bg-emerald-600 rounded-sm'
            ></div>
          ))}
          <div className='w-10 h-1  bg-slate-200 rounded-sm'></div>
        </div>
      )}

      {title === 'registros aguardando validação' && (
        <div className=' mt-1.5 mb-5 flex gap-2 items-center'>
          <div className='w-10 h-1 bg-emerald-600 rounded-sm'></div>

          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='w-10 h-1 bg-slate-200 rounded-sm'></div>
          ))}
        </div>
      )}
    </>
  );
};

export default TitleStatusBar;