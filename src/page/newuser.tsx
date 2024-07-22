import FormRegisterNewUser from '../components/forms/formregisternewuser';

//regra de negocio
const NewUser = () => {
  return (
    <main className=' w-full h-screen p-5 pt-[20%] flex flex-col text-zinc-900 relative'>
      <h1 className='font-bold'>Registrar novo usuário</h1>
      <FormRegisterNewUser />
    </main>
  );
};

export default NewUser;
