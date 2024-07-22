import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../globalcontext/globalcontext';
import { validationByAmbulatory } from '../../api/api';
import MessageValidation from '../messagevalidation';
import { useMutation } from '@tanstack/react-query';
import {
  TypeValidationAmbulatory,
  validationFormSchemaByAmbulatory,
} from '../../services/zodschemas';

const FormValidationAmbulatory = ({ idRegister }: { idRegister: number }) => {
  const { mutateAsync, data, isSuccess } = useMutation({
    mutationFn: validationByAmbulatory,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeValidationAmbulatory>({
    mode: 'onChange',
    resolver: zodResolver(validationFormSchemaByAmbulatory),
  });

  const { isId } = useContext(GlobalContext);

  async function sendFormAmbulatory(body: TypeValidationAmbulatory) {
    console.log(body);

    if (isId) {
      mutateAsync({ isId, idRegister, body });
    }
  }
  return (
    <div className=' flex flex-col max-h-[80%] overflow-y-auto'>
      {isSuccess && <MessageValidation isMenssage={data.warning} />}
      <form
        className='flex flex-col gap-4 '
        onSubmit={handleSubmit(sendFormAmbulatory)}
      >
        <label className='flex flex-col font-medium text-sm gap-1'>
          entrada no ambulatório:
          <input
            {...register('dataEntradaNoAmbulatorio')}
            type='datetime-local'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.dataEntradaNoAmbulatorio && (
            <p>{errors.dataEntradaNoAmbulatorio.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          enfermeiro responsável:
          <input
            {...register('enfermeiroResponsavel')}
            type='text'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.enfermeiroResponsavel && (
            <p>{errors.enfermeiroResponsavel.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          parte do corpo atingida(colocar o corpo para selecionar)
          <select
            {...register('parteDoCorpoAtingida')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='olhos'>olhos</option>
            <option value='cabeça'>cabeça</option>
            <option value='mãos'>mãos</option>
            <option value='peito'>peito</option>
            <option value='pés'>pés</option>
          </select>
          {errors.parteDoCorpoAtingida && (
            <p>{errors.parteDoCorpoAtingida.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          lateralidade do corpo
          <select
            {...register('lateralidadeDoCorpo')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='esquerda'>esquerda</option>
            <option value='direita'>direita</option>
            <option value='ambas'>ambas</option>
          </select>
          {errors.lateralidadeDoCorpo && (
            <p>{errors.lateralidadeDoCorpo.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          natureza da lesão
          <select
            {...register('NaturezaDaLesao')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='queimadura'>queimadura</option>
            <option value='mecanico'>mecanico</option>
            <option value='ambas'>ambas</option>
          </select>
          {errors.NaturezaDaLesao && <p>{errors.NaturezaDaLesao.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          CID:
          <input
            {...register('cid')}
            type='text'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.cid && <p>{errors.cid.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          dias de atestado:
          <input
            {...register('diasDeAtestado')}
            type='number'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.diasDeAtestado && <p>{errors.diasDeAtestado.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          dias de atestado real:
          <input
            {...register('diasDeAfastamentoReal')}
            type='number'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.diasDeAfastamentoReal && (
            <p>{errors.diasDeAfastamentoReal.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          unidade de atendimento:
          <select
            {...register('unidadeDeAtendimento')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='ambulatorio'>ambulatório</option>
            <option value='unimed'>unimed</option>
            <option value='especialista'>especialista</option>
          </select>
          {errors.unidadeDeAtendimento && (
            <p>{errors.unidadeDeAtendimento.message}</p>
          )}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          Qual o nível do acidente?
          <select
            {...register('nivelDoOcorrido')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='acidente leve'>acidente leve</option>
            <option value='acidente moderado'>acidente moderado</option>
            <option value='acidente grave'>acidente grave</option>
            <option value='fatalidade'>fatalidade</option>
          </select>
          {errors.nivelDoOcorrido && <p>{errors.nivelDoOcorrido.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          descrição do acidente
          <input
            {...register('descricaoDoAcidente')}
            type='text'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.descricaoDoAcidente && (
            <p>{errors.descricaoDoAcidente.message}</p>
          )}
        </label>

        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'bg-slate-300' : 'bg-blue-900'
          } rounded-md w-full py-2 text-white font-semibold`}
        >
          {isSubmitting ? 'validando...' : 'validar'}
        </button>
      </form>
    </div>
  );
};

export default FormValidationAmbulatory;
