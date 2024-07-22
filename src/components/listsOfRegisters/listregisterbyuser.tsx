import { TypeRegister } from '../../types/typesRegisters';
import Carousel from '../carousel/carousel';

const ListRegisterForUser = ({
  isRegisters,
}: {
  isRegisters: TypeRegister[];
}) => {
  const listRegisterNotValidation = isRegisters.filter(
    (register: TypeRegister) => {
      if (
        register.validadorAmbulatorioId === null &&
        register.validadorTSTId === null
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

  if (isRegisters) {
    return (
      <main className=' flex flex-col w-full gap-10'>
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
      </main>
    );
  }
};

export default ListRegisterForUser;
