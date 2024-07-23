const TitleStatusBar = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center '>
      <div className='flex flex-col'>
        <h2 className=' text-sm font-bold'>{title}</h2>
        {title === 'finalizados' ||
        title === 'atos' ||
        title === 'condições' ? (
          <div className=' mt-1.5 mb-5 flex gap-2 items-center'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-10 h-1 bg-emerald-600 rounded-sm'
              ></div>
            ))}
          </div>
        ) : null}

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
              <div
                key={index}
                className='w-10 h-1 bg-slate-200 rounded-sm'
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleStatusBar;
