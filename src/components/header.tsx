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
  const { isLogin, setLogin, setToken } = useContext(GlobalContext);

  function handleLogout() {
    setLogin(false);
    setToken(null);
    localStorage.removeItem('token');
  }

  if (!isLogin) return null;

  return (
    <header className='w-full h-14 shadow bg-white flex justify-end items-center py-2 px-10 absolute z-20 '>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className={` p-1 rounded border ${
          isMenuOpen
            ? ' fixed top-2 right-[66%] bg-white text-zinc-900 opacity-0 translate-x-[100px] animate-animationleft'
            : 'bg-zinc-900 text-white '
        }`}
      >
        {isMenuOpen ? <RiCloseFill size={24} /> : <RiMenu3Fill size={24} />}
      </button>

      {isMenuOpen && (
        <div className='bg-white border shadow w-2/3 h-full top-2 right-0 fixed flex flex-col px-2 py-1  gap-5 opacity-0 translate-x-[100px] animate-animationleft'>
          <div>
            <div className=' w-10 h-10 rounded-full bg-slate-500'></div>
          </div>
          <nav className=' w-full flex flex-col gap-1'>
            <p className=' font-medium text-lg mb-1'>Menu</p>
            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/'}
            >
              <IoHomeSharp />
              Início
            </Link>
            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/registrosparavalidacao'}
            >
              <IoCheckboxOutline />
              Validar
            </Link>
            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/novoregistro'}
            >
              <IoPencilSharp />
              Novo registro
            </Link>

            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/novostaff'}
            >
              <IoPersonAdd />
              Novo staff
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className=' flex items-center gap-2  translate-y-[-100px] animate-animationleft'
          >
            <IoExitOutline />
            sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
