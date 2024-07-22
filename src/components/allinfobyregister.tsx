import { useQuery } from '@tanstack/react-query';
import { IoCloseSharp } from 'react-icons/io5';
import { getRegisterById } from '../api/api';

const AllInformationsByRegister = ({
  idRegister,
  setModalInformations,
  status,
}: {
  idRegister: number;
  setModalInformations: (isModal: boolean) => void;
  status: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['teste'],
    queryFn: () => getRegisterById(idRegister),
  });
  //agora eu preciso adicionar uma funcionalidade de deletar e editar, e identifiacar se é um staff ou não
  if (data)
    return (
      <main className=' z-50 w-full h-screen fixed top-0 right-0 backdrop-blur-sm flex items-center justify-center'>
        <section className=' w-[90%] h-[90%] bg-white shadow-md border rounded-md flex flex-col gap-3 p-3 relative'>
          <button
            className='border rounded p-2.5 absolute right-2 top-2'
            onClick={() => setModalInformations(false)}
          >
            <IoCloseSharp />
          </button>
          {isLoading ? <div>carregando...</div> : null}
          <h1 className=' font-semibold flex items-center gap-1'>
            Registro Nº<span>{data.id}</span>
          </h1>

          <div className=' flex  flex-col gap-0.5'>
            <h2 className=' font-bold text-sm'>situação</h2>
            <p className=' border  rounded text-sm p-2'>{status}</p>
          </div>
          {data.cartao}
        </section>
      </main>
    );
};

export default AllInformationsByRegister;
