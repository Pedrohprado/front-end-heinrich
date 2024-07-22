const Tag = ({ level }: { level: string }) => {
  return (
    <p
      className={`${
        level === 'ato inseguro'
          ? ' border-green-950 bg-green-200 text-green-900'
          : level === 'condição insegura'
          ? ' border-green-700 bg-green-200 text-green-900'
          : level === 'quase acidente'
          ? ' border-green-600 bg-green-200 text-green-900'
          : level === 'primeiros socorros'
          ? ' border-yellow-600 bg-yellow-200 text-yellow-900'
          : level === 'acidente leve'
          ? ' border-orange-500 bg-orange-200 text-orange-900'
          : level === 'acidente moderado'
          ? ' border-red-500 bg-red-200 text-red-900'
          : level === 'acidente grave'
          ? ' border-red-600 bg-red-200 text-red-900'
          : level === 'fatalidade'
          ? ' border-red-800 bg-red-200 text-red-900'
          : level === 'acidente'
          ? ' border-red-600 bg-red-200 text-red-900'
          : ''
      } w-full flex justify-center items-center rounded-md font-medium text-sm`}
    >
      {level}
    </p>
  );
};

export default Tag;
