import { useQuery } from '@tanstack/react-query';
import { getRegisterById } from '../api/api';

const AllInformationsByRegister = ({
  idRegister,
  setModalInformations,
}: {
  idRegister: number;
  setModalInformations: (isModal: boolean) => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['teste'],
    queryFn: () => getRegisterById(idRegister),
  });

  if (data)
    return (
      <main className=' z-50 w-full h-screen fixed top-0 right-0 backdrop-blur-sm flex items-center justify-center'>
        <section className=' w-[90%] h-[90%] bg-white shadow-md border rounded-md flex flex-col p-2'>
          <button
            className='border'
            onClick={() => setModalInformations(false)}
          >
            close
          </button>
          {isLoading ? <div>carregando...</div> : null}
          {data.cartao}
          {idRegister}
        </section>
      </main>
    );
};

export default AllInformationsByRegister;
