import { useContext, useState } from 'react';
import { RiMenu3Fill, RiCloseFill } from 'react-icons/ri';
import {
  IoHomeSharp,
  IoPencilSharp,
  IoCheckboxOutline,
  IoPersonAdd,
  IoExitOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const { isLogin } = useContext(GlobalContext);

  if (!isLogin) return null;
  return (
    <header className='w-full h-14 shadow bg-white flex justify-end items-center py-2 px-10 absolute z-10'>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className='bg-slate-500 p-1 rounded-sm transition '
      >
        {isMenuOpen ? <RiCloseFill size={24} /> : <RiMenu3Fill size={24} />}
      </button>

      {isMenuOpen && (
        <div className=' bg-white shadow w-2/3 top-11 right-10 fixed z-20 flex flex-col p-4 gap-5'>
          <Link
            className=' flex items-center gap-2'
            onClick={() => setMenuOpen(!isMenuOpen)}
            to={'/'}
          >
            <IoHomeSharp />
            Início
          </Link>
          <Link
            className=' flex items-center gap-2'
            onClick={() => setMenuOpen(!isMenuOpen)}
            to={'/registrosparavalidacao'}
          >
            <IoCheckboxOutline />
            Validar
          </Link>
          <Link
            className=' flex items-center gap-2'
            onClick={() => setMenuOpen(!isMenuOpen)}
            to={'/novoregistro'}
          >
            <IoPencilSharp />
            Novo registro
          </Link>

          <Link
            className=' flex items-center gap-2'
            onClick={() => setMenuOpen(!isMenuOpen)}
            to={'/novostaff'}
          >
            <IoPersonAdd />
            Novo staff
          </Link>

          <button className=' flex items-center gap-2 bg-slate-300'>
            {' '}
            <IoExitOutline />
            sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
