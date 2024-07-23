import { TypeRegister } from '../../types/typesRegisters';
import Carousel from '../carousel/carousel';

const ListRegisterForUser = ({
  isRegisters,
  myValidations,
}: {
  isRegisters: TypeRegister[];
  myValidations: boolean;
}) => {
  const listRegisterNotValidation = isRegisters.filter(
    (register: TypeRegister) => {
      if (
        register.validadorAmbulatorioId === null &&
        register.validadorTSTId === null &&
        !register.nivelDoOcorrido.includes('ato')
      )
        return register;
    }
  );

  const listRegisterValidationByAmbulatory = isRegisters.filter((register) => {
    if (
      register.validadorAmbulatorioId !== null &&
      register.validadorTSTId === null
    )
      return register;
  });

  const listRegisterValidationByTst = isRegisters.filter((register) => {
    if (
      register.validadorAmbulatorioId !== null &&
      register.validadorTSTId !== null
    )
      return register;
  });

  const listRegisterTypeAto = isRegisters.filter((register) => {
    if (register.nivelDoOcorrido.includes('ato')) return register;
  });

  const listRegisterTypeCondition = isRegisters.filter((register) => {
    if (
      register.nivelDoOcorrido.includes('condição') &&
      register.validadorTSTId
    )
      return register;
  });

  if (isRegisters && myValidations) {
    return (
      <main>
        {isRegisters.length > 0 ? (
          <Carousel
            register={isRegisters}
            title={'Validados'}
            status='validados'
          />
        ) : null}
      </main>
    );
  }

  if (isRegisters) {
    return (
      <main className=' flex flex-col w-full  gap-3'>
        {listRegisterNotValidation.length > 0 ? (
          <Carousel
            register={listRegisterNotValidation}
            title={'registros aguardando validação'}
            status='aguardando validações'
          />
        ) : null}

        {listRegisterValidationByAmbulatory.length > 0 ? (
          <Carousel
            register={listRegisterValidationByAmbulatory}
            title={'validados pelo ambulatório'}
            status='validado pelo ambulatório'
          />
        ) : null}

        {listRegisterValidationByTst.length > 0 ? (
          <Carousel
            register={listRegisterValidationByTst}
            title={'finalizados'}
            status='validado'
          />
        ) : null}

        {listRegisterTypeAto.length > 0 ? (
          <Carousel
            register={listRegisterTypeAto}
            title={'atos'}
            status='validado'
          />
        ) : null}

        {listRegisterTypeCondition.length > 0 ? (
          <Carousel
            register={listRegisterTypeCondition}
            title={'condições'}
            status='validado'
          />
        ) : null}
      </main>
    );
  }
};

export default ListRegisterForUser;
