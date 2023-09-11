import { config } from '@/config';
import { PrivateRoutes, PublicRoutes } from '@/models/routes';
import { resetUser } from '@/redux/state/user.slice';
import { AppDispatch, AppStore } from '@/redux/store';
import { clearLocalStorage } from '@/utils/localStorage.util';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import React from 'react';
import { RiCloseLine, RiLogoutBoxRLine, RiMenu3Fill, RiSurveyLine, RiUser2Line, RiUser3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const registers = [
  {
    name: 'Profesores',
    icon: <RiUser2Line className='text-[1.25rem]' />,
    to: PrivateRoutes.TEACHER,
  },
  {
    name: 'Alumnos',
    icon: <RiUser3Line className='text-[1.25rem]' />,
    to: PrivateRoutes.STUDENT,
  },
];

export const Sidebar: React.FC = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const userState = useSelector((store: AppStore) => store.user);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className='min-h-screen grid grid-col-1 lg:grid-cols-6'>
      <Flowbite>
        <div
          className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white dark:bg-slate-800 transition-all ${
            sidebar ? 'left-0' : '-left-full'
          } h-full overflow-y-auto col-span-1 p-4 lg:p-8 border-r dark:border-black`}
        >
          <div className='text-center p-8'>
            <DarkThemeToggle className='mb-5' />
            <Link to='/private/dashboard'>
              <h1 className='uppercase font-bold tracking-[4px] dark:text-gray-300'>{userState.username}</h1>
            </Link>
          </div>
          <div className='flex flex-col justify-between h-[800px]'>
            <nav>
              <h5 className='uppercase font-bold text-xs text-primary tracking-[2px] mb-4 dark:text-cyan-500'>Registros</h5>
              <ul>
                {registers.map((reg) => (
                  <li key={reg.to}>
                    <Link to={reg.to} className='flex items-center dark:text-gray-300 gap-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors rounded-lg'>
                      {reg.icon} <span>{reg.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <h5 className='uppercase font-bold text-xs text-primary tracking-[2px] my-4 dark:text-cyan-500'>Otros</h5>
              <ul>
                <li>
                  <Link to={''} className='flex dark:hover:bg-gray-600 dark:text-gray-300 items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg'>
                    <RiSurveyLine className='text-[1.25rem]' />
                    <span>...Proxim</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <Reminder />
          </div>
        </div>
        <button onClick={handleSidebar} className='block lg:hidden fixed bottom-4 right-4 bg-primary p-2 text-white rounded-full text-2xl z-40'>
          {sidebar ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
        <div className='lg:col-span-5 bg-gray-100 dark:bg-slate-700 p-8'>
          <Outlet />
        </div>
      </Flowbite>
    </div>
  );
};

function Reminder() {
  const navigate = useNavigate();
  const distpath = useDispatch<AppDispatch>();
  const handleLogout = () => {
    clearLocalStorage(config.TOKEN_STORAGE);
    distpath(resetUser());
    navigate(PublicRoutes.LOGIN, { replace: true });
  };

  return (
    <div className='flex flex-col gap-4'>
      <img src='/img/sidebar.svg' alt='Image' />
      <div className='bg-primary bg-opacity-10 p-4 lg:p-8 flex flex-col gap-4 rounded-3xl'>
        <h3 className='text-xl text-center dark:text-gray-300'>Advertencia</h3>
        <p className='text-gray-500 text-center dark:text-gray-400'>Toda informacion mostrada en las tablas es confidencial.</p>
      </div>
      <button onClick={handleLogout} className='dark:text-gray-300 flex items-center gap-4 hover:bg-primary hover:bg-opacity-80 p-4 hover:text-white rounded-lg transition-colors font-semibold'>
        <RiLogoutBoxRLine />
        Cerrar Sesión
      </button>
    </div>
  );
}
