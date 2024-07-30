import { useQuery } from '@tanstack/react-query';
import { IoCloseSharp } from 'react-icons/io5';
import { getRegisterById } from '../../api/api';
import Tag from '../tag';
import RiskAssessment from '../graphcs/riskassessment';
import SliceOfBody from '../graphcs/sliceofbody';
import CarouselRegister from './carouselregister';

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

  if (data)
    return (
      <main className=' z-50 w-full h-screen fixed top-0 right-0 backdrop-blur-sm flex items-center justify-center'>
        <section className=' w-[90%] h-[90%] bg-white shadow-md border rounded-md flex flex-col gap-3 p-3 relative overflow-auto'>
          {isLoading ? <div>carregando...</div> : null}

          <nav className=' w-full flex items-center justify-between'>
            <h1 className=' font-semibold flex items-center gap-1'>
              Registro Nº<span>{data.id}</span>
            </h1>
            <button
              className='border rounded p-2'
              onClick={() => setModalInformations(false)}
            >
              <IoCloseSharp />
            </button>
          </nav>

          <div className=' flex flex-col gap-2 p-2 border rounded'>
            <div className=' flex flex-col gap-1'>
              <Tag level={data.nivelDoOcorrido} />
            </div>

            <div className=' flex items-center gap-2'>
              <div className=' flex  flex-col gap-1 w-full'>
                <h2 className=' font-semibold text-sm'>data</h2>
                <p className=' border  rounded text-sm p-2'>
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className=' flex  flex-col gap-1 w-full'>
                <h2 className=' font-semibold text-sm'>horário</h2>
                <p className=' border rounded text-sm p-2 w-full'>
                  {new Date(data.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className=' flex  flex-col gap-1'>
              <h2 className=' font-semibold text-sm'>situação</h2>
              <p className=' border  rounded text-sm p-2'>{status}</p>
            </div>
          </div>

          <div className=' mt-2'>
            <h2 className=' mb-1 text-sm font-bold'>informações gerais</h2>
            <div className=' flex flex-col gap-2 p-2 border rounded'>
              <div className=' flex items-center gap-2'>
                <div className=' flex  flex-col gap-1'>
                  <h2 className=' font-semibold text-sm'>cartão</h2>
                  <p className=' border  rounded text-sm p-2'>{data.cartao}</p>
                </div>
                <div className=' flex  flex-col gap-1 w-full'>
                  <h2 className=' font-semibold text-sm'>
                    nome do funcionário
                  </h2>
                  <p className=' border rounded text-sm p-2 w-full'>
                    {data.nome.slice(0, 21)}
                  </p>
                </div>
              </div>
              <div className=' flex items-center gap-2 '>
                <div className=' flex  flex-col gap-1 w-full'>
                  <h2 className=' font-semibold text-sm'>lider responsável</h2>
                  <p className=' border  rounded text-sm p-2'>
                    {data.liderResponsavel}
                  </p>
                </div>
                <div className=' flex  flex-col gap-1 w-full'>
                  <h2 className=' font-semibold text-sm'>setor</h2>
                  <p className=' border rounded text-sm p-2'>{data.setor}</p>
                </div>
              </div>
              <div className=' flex  flex-col gap-1 w-full mt-2'>
                <h2 className=' font-semibold text-sm'>descrição</h2>
                <p className='  rounded text-sm p-2'>{data.descricao}</p>
              </div>
            </div>
          </div>

          {data.validadorAmbulatorioId && (
            <div className=' mt-2'>
              <h2 className=' mb-1 text-sm font-bold'>
                informações do ambulátorio
              </h2>

              <div className=' flex flex-col gap-3 p-2 border rounded'>
                <div className=' flex  flex-col gap-1'>
                  <h2 className=' font-semibold text-sm'>
                    entrada no ambulatório
                  </h2>
                  <div className=' flex w-full gap-2'>
                    <p className=' border  rounded text-sm p-2 w-1/2'>
                      {typeof data.dataEntradaNoAmbulatorio === 'string'
                        ? new Date(
                            data.dataEntradaNoAmbulatorio
                          ).toLocaleDateString()
                        : null}
                    </p>
                    <p className=' border  rounded text-sm p-2 w-1/2'>
                      {typeof data.dataEntradaNoAmbulatorio === 'string'
                        ? new Date(
                            data.dataEntradaNoAmbulatorio
                          ).toLocaleTimeString()
                        : null}
                    </p>
                  </div>
                </div>
                <div className=' flex items-center gap-2'>
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-sm'>
                      enfermeiro responsável
                    </h2>
                    <p className=' border rounded text-sm p-2 w-full'>
                      {data.enfermeiroResponsavel}
                    </p>
                  </div>
                </div>
                <div className=' flex items-center gap-2 '>
                  <div className=' flex  flex-col gap-1 '>
                    <h2 className=' font-semibold text-sm'>afastamento real</h2>
                    <p className=' border  rounded text-sm p-2'>
                      {data.diasDeAfastamentoReal}
                    </p>
                  </div>
                  <div className=' flex  flex-col gap-1'>
                    <h2 className=' font-semibold text-sm'>dias de atestado</h2>
                    <p className=' border rounded text-sm p-2'>
                      {data.diasDeAtestado}
                    </p>
                  </div>
                </div>
                <div className=' flex items-center gap-2 '>
                  <div className=' flex  flex-col gap-1 '>
                    <h2 className=' font-semibold text-sm'>CID</h2>
                    <p className=' border  rounded text-sm p-2'>{data.cid}</p>
                  </div>
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-xs'>
                      Unidade de atendimento
                    </h2>
                    <p className=' border rounded text-sm p-2'>
                      {data.unidadeDeAtendimento}
                    </p>
                  </div>
                </div>
                {data.parteDoCorpoAtingida ? (
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-sm'>
                      partes do corpo atingida
                    </h2>
                    <SliceOfBody />
                  </div>
                ) : null}
                <div className=' flex  flex-col gap-1 w-full mt-2'>
                  <h2 className=' font-semibold text-sm'>
                    descrição do acidente
                  </h2>
                  <p className=' rounded text-sm p-2'>
                    {data.descricaoDoAcidente}
                  </p>
                </div>
              </div>
            </div>
          )}

          {data.validadorTSTId && (
            <div className=' mt-2 flex flex-col gap-2'>
              <h2 className=' mb-1 text-sm font-bold'>informações TST</h2>
              <div className=' flex flex-col gap-2 p-2 border rounded'>
                <div className=' flex items-center gap-2'>
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-sm'>probabilidade</h2>
                    <p className=' border  rounded text-sm p-2'>
                      {data.probabilidade}
                    </p>
                  </div>
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-sm'>gravidade</h2>
                    <p className=' border rounded text-sm p-2 w-full'>
                      {data.gravidade}
                    </p>
                  </div>
                </div>
                {data.probabilidade &&
                data.gravidade &&
                data.fatorRiscoAcidente ? (
                  <div className=' flex  flex-col gap-1 w-full'>
                    <h2 className=' font-semibold text-sm'>
                      fator de risco e acidente
                    </h2>

                    <RiskAssessment
                      probability={data.probabilidade}
                      gravity={data.gravidade}
                    />
                  </div>
                ) : null}
              </div>
              <div className=' flex  flex-col gap-1 w-full'>
                <h2 className=' font-semibold text-sm'>data da validação</h2>
                <p className=' border rounded text-sm p-2 w-full'>
                  {data.dataValidacaoTST &&
                    new Date(data.dataValidacaoTST).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {data.Imagens && data.Imagens.length > 0 ? (
            <div className=' mt-2 flex flex-col w-full gap-2'>
              <h2 className=' mb-1 text-sm font-bold'>imagens</h2>
              <div className=' flex  items-center gap-2 '>
                <CarouselRegister listImgs={data.Imagens} />
              </div>
            </div>
          ) : null}
        </section>
      </main>
    );
};

export default AllInformationsByRegister;
