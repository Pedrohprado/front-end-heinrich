import { useContext } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';
import { useQuery } from '@tanstack/react-query';
import { allRegisterValidaitonByIdAndRole } from '../api/api';
import ListRegisterForUser from '../components/listsOfRegisters/listregisterbyuser';

const MyRegistersValidation = () => {
  const { isId, isRole } = useContext(GlobalContext);

  const { data } = useQuery({
    queryKey: ['registervalidationbyid'],
    queryFn: () => allRegisterValidaitonByIdAndRole({ isRole, isId }),
  });

  return (
    <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900 '>
      {data && isRole === 'STAFFAMBULATORY' ? (
        <ListRegisterForUser isRegisters={data} myValidations={true} />
      ) : data && isRole === 'STAFFTST' ? (
        <ListRegisterForUser isRegisters={data} myValidations={true} />
      ) : null}
    </main>
  );
};

export default MyRegistersValidation;
