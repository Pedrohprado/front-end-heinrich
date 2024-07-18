import { useContext } from 'react';
import { listAllRegisterNeedValidationByRole } from '../api/api';
import { GlobalContext } from '../globalcontext/globalcontext';
import ListRegisterValidationForTst from '../components/listsOfRegisters/listregistervalidationfortst';
import ListRegisterAmbulatory from '../components/listsOfRegisters/listregistervalidationforambulatory';
import { useQuery } from '@tanstack/react-query';

function RegisterValidation() {
  const { isId, isRole } = useContext(GlobalContext);

  const { data } = useQuery({
    queryKey: ['registersvalidation'],
    queryFn: () => listAllRegisterNeedValidationByRole({ isRole, isId }),
  });

  if (data && isRole === 'STAFFTST')
    return <ListRegisterValidationForTst isRegisters={data} />;

  if (data && isRole === 'STAFFAMBULATORY')
    return <ListRegisterAmbulatory isRegisters={data} />;
}

export default RegisterValidation;
