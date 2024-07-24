import { createdNewRegister } from '../api/api';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent, useContext, useState } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';
import MessageValidation from '../components/messagevalidation';
import { useMutation } from '@tanstack/react-query';
import { IoTrash } from 'react-icons/io5';

const registerInformationSchema = z.object({
  nivelDoOcorrido: z.string(),
  nome: z.string().min(4, 'preencha o campo nome'),
  cartao: z.string().min(4, 'preencha o campo cartão'),
  setor: z.string().min(4, 'preencha o campo setor'),
  liderResponsavel: z.string().min(4, 'preencha o campo lider'),
  cliente: z.string(),
  produto: z.string(),
  descricao: z.string().min(5, 'descreva o ocorrido'),
  // imagens: z.instanceof(FileList),
  imagens: z.any(),
});

export type TypeRegisterForm = z.infer<typeof registerInformationSchema>;

const NewRegister = () => {
  const [images, setImages] = useState<File[]>([]);
  const { mutateAsync, data, isSuccess } = useMutation({
    mutationFn: createdNewRegister,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeRegisterForm>({
    resolver: zodResolver(registerInformationSchema),
    mode: 'onChange',
  });

  const { isId } = useContext(GlobalContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    // Convert FileList to Array
    const selectedImages = Array.from(event.target.files);
    // console.log(selectedImages);

    // Ensure only up to 3 images are selected
    const slicedImages = selectedImages.slice(0, 3);

    // Update state with selected images
    setImages(slicedImages);
  };

  async function sendRegister(form: TypeRegisterForm) {
    if (isId) {
      console.log(form);
      form.imagens = images;
      mutateAsync({ isId, form });
    }
  }

  return (
    <main className=' w-full h-screen p-10 pt-[20%] flex flex-col text-zinc-900'>
      {isSuccess && <MessageValidation isMenssage={data.warning} />}
      <h1 className='font-bold text-xl mb-5'>Registrar novo ocorrido</h1>
      <form
        onSubmit={handleSubmit(sendRegister)}
        className='flex flex-col gap-6 py-5'
      >
        <label className=' flex flex-col font-medium text-sm gap-1'>
          possível nível do ocorrido
          <select
            {...register('nivelDoOcorrido')}
            className=' px-2 py-3 border rounded-md font-light'
          >
            <option hidden></option>
            <option value='ato inseguro'>ato inseguro</option>
            <option value='condição insegura'>condição insegura</option>
            <option value='quase acidente'>quase acidente</option>
            <option value='primeiros socorros'>primeiros socorros</option>
            <option value='acidente'>acidente</option>
          </select>
          {errors.nivelDoOcorrido && <p>{errors.nivelDoOcorrido.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Nome
          <input
            {...register('nome')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            {...register('cartao')}
            type='number'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.cartao && <p>{errors.cartao.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Setor
          <input
            {...register('setor')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.setor && <p>{errors.setor.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Lider responsável
          <input
            {...register('liderResponsavel')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.liderResponsavel && <p>{errors.liderResponsavel.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          cliente
          <input
            {...register('cliente')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.cliente && <p>{errors.cliente.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Produto
          <input
            {...register('produto')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.produto && <p>{errors.produto.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Descrição
          <input
            {...register('descricao')}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
          {errors.descricao && <p>{errors.descricao.message}</p>}
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Adicione algumas imagens:
          <input
            multiple
            onChange={handleChange}
            accept='image/*'
            type='file'
            className=' px-2 py-3 border-2 rounded-md font-light border-dashed'
          />
        </label>
        {images.length > 0 && (
          <div className=' flex gap-1 '>
            {images.map((image, index) => (
              <div key={index} className=' relative'>
                <div
                  className={` ${
                    images.length === 1 ? 'p-2' : 'p-1'
                  }  bg-red-200 absolute top-1 left-1 rounded text-red-600`}
                  onClick={() => {
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                >
                  <IoTrash />
                </div>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                />
              </div>
            ))}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className={`${
            isSubmitting ? ' bg-slate-300' : 'bg-blue-900'
          } rounded-md w-full py-2 text-white font-semibold`}
        >
          {isSubmitting ? 'enviando' : 'registrar'}
        </button>
      </form>
    </main>
  );
};

export default NewRegister;
