import { useEffect, useState } from 'react';
import { OcorrenciasPorNivel, TypeRegister } from '../../types/typesRegisters';
import TitleStatusBar from './titlestatusbar';
import SplitByLvlOfOccorrence from './splitbylvlofoccorrence';

const Carousel = ({
  register,
  title,
  status,
}: {
  register: TypeRegister[];
  title: string;
  status: string;
}) => {
  const [isOccorrence, setOccorrence] = useState<null | OcorrenciasPorNivel>(
    null
  );

  //construir um filtro onde vai separar por categoria os registros
  useEffect(() => {
    // console.log(register);
    const ocorrenciasPorNivel: OcorrenciasPorNivel = {};

    register.forEach((item) => {
      item.nivelDoOcorrido;
      const { nivelDoOcorrido } = item;
      if (!ocorrenciasPorNivel[nivelDoOcorrido]) {
        ocorrenciasPorNivel[nivelDoOcorrido] = [];
      }
      ocorrenciasPorNivel[nivelDoOcorrido].push(item);
    });
    setOccorrence(ocorrenciasPorNivel);
    console.log(ocorrenciasPorNivel, 'oi');
  }, [register]);

  return (
    <section className='overflow-hidden mb-5 bg-stone-50 p-2'>
      <TitleStatusBar title={title} />
      {isOccorrence
        ? Object.keys(isOccorrence).map((key, index) =>
            key === 'ato inseguro' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'condição insegura' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'quase acidente' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'primeiros socorros' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'acidente' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'acidente leve' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'acidente moderado' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'acidente grave' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : key === 'fatalidade' ? (
              <SplitByLvlOfOccorrence
                key={index}
                lvlOccorrence={key}
                register={isOccorrence[key]}
                status={status}
              />
            ) : null
          )
        : null}
    </section>
  );
};

export default Carousel;
