import { useContext, useState } from 'react';
import { z } from 'zod';
import MessageValidation from '../messagevalidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlobalContext } from '../../globalcontext/globalcontext';
import { validationByTst } from '../../api/api';

const validationFormSchema = z.object({
  probabilidade: z.coerce.number().max(5),
  gravidade: z.coerce.number().max(5),
  fatorRiscoAcidente: z.number().optional(),
});

export type TypeValidationTst = z.infer<typeof validationFormSchema>;

const FormValidationTst = ({ idRegister }: { idRegister: number }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TypeValidationTst>({
    mode: 'onChange',
    resolver: zodResolver(validationFormSchema),
  });

  const [isMensage, setMensage] = useState<string | null>(null);

  const { isId } = useContext(GlobalContext);

  async function sendFormTst(data: TypeValidationTst) {
    try {
      console.log(data);
      data.fatorRiscoAcidente = +data.probabilidade * +data.gravidade;
      if (isId) {
        const statusValidation = await validationByTst(isId, idRegister, data);

        console.log(statusValidation);
        if (statusValidation.warning === 'registro validado com sucesso!') {
          setMensage(statusValidation.warning);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' flex flex-col max-h-[80%] overflow-y-auto'>
      {isMensage && (
        <MessageValidation isMenssage={isMensage} setMenssage={setMensage} />
      )}

      <form
        className='flex flex-col gap-4 mt-5'
        onSubmit={handleSubmit(sendFormTst)}
      >
        <label className='flex flex-col font-medium text-sm gap-1'>
          probabilidade:
          <input
            {...register('probabilidade')}
            type='number'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.probabilidade && <p>{errors.probabilidade.message}</p>}
        </label>
        <label className='flex flex-col font-medium text-sm gap-1'>
          gravidade:
          <input
            {...register('gravidade')}
            type='number'
            className='px-2 py-3 border rounded-md font-light'
          />
          {errors.gravidade && <p>{errors.gravidade.message}</p>}
        </label>
        <div className='flex flex-col font-medium text-sm gap-1'>
          <p>fator de risco:</p>
          {watch('gravidade') * watch('probabilidade')}
        </div>
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

export default FormValidationTst;
