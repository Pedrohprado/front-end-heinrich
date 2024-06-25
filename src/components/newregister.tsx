const NewRegister = () => {
  return (
    <main className=' w-full h-screen p-10 flex flex-col text-zinc-900'>
      <form action="">
      <label className=' flex flex-col font-medium text-sm gap-1'>
          Nome
          <input
            value={isName}
            onChange={(event) => setName(event.target.value)}
            type='text'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Cartão
          <input
            value={isCard}
            onChange={(event) => setCard(event.target.value)}
            type='number'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
        <label className=' flex flex-col font-medium text-sm gap-1'>
          Senha
          <input
            value={isPassword}
            onChange={(event) => setPassword(event.target.value)}
            type='password'
            className=' px-2 py-3 border rounded-md font-light'
          />
        </label>
      </form>
    </main>
  )
}

export default NewRegister
