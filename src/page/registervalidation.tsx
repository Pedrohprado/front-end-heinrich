import { useContext, useEffect, useState } from 'react';
import { TypeRegister } from '../types/typesRegisters';
import {
  listRegisterNeedValidationAmbulatory,
  listRegisterNeedValidationTst,
} from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';
import ListRegisterValidationForTst from '../components/listsOfRegisters/listregistervalidationfortst';
import ListRegisterAmbulatory from '../components/listsOfRegisters/listregistervalidationforambulatory';

function RegisterValidation() {
  const [isRegisters, setRegisters] = useState<TypeRegister[] | null>(null);
  const { isId, isRole } = useContext(GlobalContext);

  useEffect(() => {
    const getAllRegisters = async () => {
      if (isRole === 'STAFFAMBULATORY' && isId) {
        try {
          const listOfRegister = await listRegisterNeedValidationAmbulatory(
            isId
          );
          setRegisters(listOfRegister);
        } catch (error) {
          console.log(error);
        }
      }
      if (isRole === 'STAFFTST' && isId) {
        try {
          const listOfRegisterTst = await listRegisterNeedValidationTst(isId);
          setRegisters(listOfRegisterTst);
          console.log(listOfRegisterTst);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getAllRegisters();
  }, [isId, isRole]);

  if (isRegisters && isRole === 'STAFFTST')
    return <ListRegisterValidationForTst isRegisters={isRegisters} />;

  if (isRegisters && isRole === 'STAFFAMBULATORY')
    return <ListRegisterAmbulatory isRegisters={isRegisters} />;
}

export default RegisterValidation;
