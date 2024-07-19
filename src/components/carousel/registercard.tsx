import { RefObject } from 'react';
import { TypeRegister } from '../../types/typesRegisters';
import Tag from '../tag';

const RegisterCard = ({
  register,
  position,
  contentRef,
}: {
  register: TypeRegister[];
  position: number;
  contentRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className=' transition w-full flex items-center'
      style={{ transform: `translateX(${position}px)` }}
      ref={contentRef}
    >
      {register.map((register: TypeRegister) => (
        <div
          key={register.id}
          className=' rounded-md border p-2 flex-shrink-0 w-full flex flex-col gap-2'
        >
          <div className=' flex items-center justify-between gap-2'>
            <Tag level={register.nivelDoOcorrido} />

            <p className=' text-sm font-medium'>
              {new Date(register.createdAt).toLocaleDateString('pt-br')}
            </p>
          </div>
          <div className=' flex items-center justify-between gap-2'>
            <p className=' text-sm'>{register.setor}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisterCard;
