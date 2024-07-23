import Tag from '../tag';
import RegisterCard from './registercard';
import { TypeRegister } from '../../types/typesRegisters';

const SplitByLvlOfOccorrence = ({
  lvlOccorrence,
  register,

  status,
}: {
  lvlOccorrence: string;
  register: TypeRegister[] | null;
  status: string;
}) => {
  return (
    <div className=' bg-white p-2 flex flex-col mt-3 rounded'>
      <div className=' flex items-center'>
        <Tag level={lvlOccorrence} />
        <p className='flex items-center justify-center w-1/2'>
          {register?.length}
        </p>
      </div>
      {register ? (
        <div className=' mt-2'>
          <RegisterCard status={status} register={register} />
        </div>
      ) : null}
    </div>
  );
};

export default SplitByLvlOfOccorrence;
