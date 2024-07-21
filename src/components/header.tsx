import { useContext, useState } from 'react';
import { RiMenu3Fill, RiCloseFill } from 'react-icons/ri';
import {
  IoBook,
  IoHomeSharp,
  IoPencilSharp,
  IoCheckboxOutline,
  IoPersonAdd,
  IoExitOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../globalcontext/globalcontext';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const { isUser, isCardNumber, isLogin, isRole, setLogin } =
    useContext(GlobalContext);

  function handleLogout() {
    setMenuOpen(false);
    localStorage.removeItem('token');
    setLogin(false);
  }

  if (!isLogin) return null;

  return (
    <header className='w-full h-14 shadow bg-white flex justify-end items-center py-2 px-5 absolute z-20 '>
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
          <div className=' mt-3 flex gap-4 items-center'>
            <div className=' w-10 h-10 rounded-md bg-slate-500 flex items-center justify-center text-white'>
              <IoPersonOutline size={18} />
            </div>
            <div>
              {isUser && (
                <p className=' font-semibold '>{isUser.split(' ')[0]}</p>
              )}
              <div className=' flex items-center gap-2 w-full '>
                <p className='text-sm  text-zinc-400'>{isCardNumber}</p>
                {isRole && (
                  <p className='text-sm  text-zinc-400'>
                    {isRole.replace('STAFF', '').toLowerCase()}
                  </p>
                )}
              </div>
            </div>
          </div>
          <nav className=' w-full flex flex-col gap-1'>
            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/'}
            >
              <IoHomeSharp />
              início
            </Link>
            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/myregisters'}
            >
              <IoBook />
              meus registros
            </Link>

            <Link
              className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2'
              onClick={() => setMenuOpen(!isMenuOpen)}
              to={'/novoregistro'}
            >
              <IoPencilSharp />
              novo registro
            </Link>
          </nav>

          {isRole === 'USER' ? null : (
            <nav>
              <h2 className=' mt-2 mb-1 font-bold text-sm'>Área do staff</h2>
              <Link
                className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2
              '
                onClick={() => setMenuOpen(!isMenuOpen)}
                to={'/registrosparavalidacao'}
              >
                <IoCheckboxOutline />
                validar
              </Link>

              {/* <Link
                className=' flex items-center gap-2 opacity-0 translate-y-[-100px] animate-animationleft shadow-sm py-2'
                onClick={() => setMenuOpen(!isMenuOpen)}
                to={'/novostaff'}
              >
                <IoPersonAdd />
                novo staff
              </Link> */}
            </nav>
          )}

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
