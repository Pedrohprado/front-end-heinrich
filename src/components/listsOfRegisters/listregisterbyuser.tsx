import { FaCheck, FaCircleNotch } from 'react-icons/fa';
import { TypeRegister } from '../../types/typesRegisters';
import Tag from '../tag';

const ListRegisterForUser = ({
  isRegisters,
}: {
  isRegisters: TypeRegister[];
}) => {
  if (isRegisters) {
    return (
      <section className=' flex flex-col w-full h-[85%] justify-between'>
        <div className=' flex flex-col gap-2'>
          <h2>registros não validados</h2>
          <div className=' flex flex-col gap-2 max-h-[80%] overflow-y-auto'>
            {isRegisters.map((register: TypeRegister) =>
              register.validadorAmbulatorioId === null &&
              register.validadorTSTId === null ? (
                <div
                  key={register.id}
                  className=' rounded-md border w-full p-3 flex flex-col gap-2'
                >
                  <div className=' flex items-center justify-between gap-2'>
                    <Tag level={register.nivelDoOcorrido} />

                    <p className=' text-sm font-medium'>
                      {new Date(register.createdAt).toLocaleDateString('pt-br')}
                    </p>
                  </div>
                  <p>{register.descricao}</p>
                  <div className=' flex items-center justify-between gap-2'>
                    <p className=''>{register.setor}</p>
                    <div
                      className={`${
                        register.validadorTSTId
                          ? ' border-green-950 bg-green-200 text-green-900'
                          : ' border-yellow-600 bg-yellow-200 text-yellow-900 '
                      } p-2 rounded-md`}
                    >
                      {register.validadorTSTId ? (
                        <FaCheck />
                      ) : (
                        <div className='animate-spin transition'>
                          <FaCircleNotch />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className=' flex flex-col gap-2'>
          <h2>registros validados pelo ambulatório</h2>
          <div className=' flex flex-col gap-2 max-h-[80%] overflow-y-auto'>
            {isRegisters.map((register: TypeRegister) =>
              register.validadorAmbulatorioId !== null &&
              register.validadorTSTId === null ? (
                <div
                  key={register.id}
                  className=' rounded-md border w-full p-3 flex flex-col gap-2'
                >
                  <div className=' flex items-center justify-between gap-2'>
                    <Tag level={register.nivelDoOcorrido} />

                    <p className=' text-sm font-medium'>
                      {new Date(register.createdAt).toLocaleDateString('pt-br')}
                    </p>
                  </div>
                  <p>{register.descricao}</p>
                  <div className=' flex items-center justify-between gap-2'>
                    <p className=''>{register.setor}</p>
                    <div
                      className={`${
                        register.validadorTSTId
                          ? ' border-green-950 bg-green-200 text-green-900'
                          : ' border-yellow-600 bg-yellow-200 text-yellow-900 '
                      } p-2 rounded-md`}
                    >
                      {register.validadorTSTId ? (
                        <FaCheck />
                      ) : (
                        <div className='animate-spin transition'>
                          <FaCircleNotch />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className=' flex flex-col gap-2'>
          <h2>registros validados pelo TST</h2>
          <div className=' flex flex-col gap-2 max-h-[80%] overflow-y-auto'>
            {isRegisters.map((register: TypeRegister) =>
              register.validadorAmbulatorioId !== null &&
              register.validadorTSTId !== null ? (
                <div
                  key={register.id}
                  className=' rounded-md border w-full p-3 flex flex-col gap-2'
                >
                  <div className=' flex items-center justify-between gap-2'>
                    <Tag level={register.nivelDoOcorrido} />

                    <p className=' text-sm font-medium'>
                      {new Date(register.createdAt).toLocaleDateString('pt-br')}
                    </p>
                  </div>
                  <p>{register.descricao}</p>
                  <div className=' flex items-center justify-between gap-2'>
                    <p className=''>{register.setor}</p>
                    <div
                      className={`${
                        register.validadorTSTId
                          ? ' border-green-950 bg-green-200 text-green-900'
                          : ' border-yellow-600 bg-yellow-200 text-yellow-900 '
                      } p-2 rounded-md`}
                    >
                      {register.validadorTSTId ? (
                        <FaCheck />
                      ) : (
                        <div className='animate-spin transition'>
                          <FaCircleNotch />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    );
  }
};

export default ListRegisterForUser;
