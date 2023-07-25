import { config } from "@/config";
import { PublicRoutes } from "@/models";
import { resetUser } from "@/redux/state/userSlice";
import { AppDispatch } from "@/redux/store";
import { clearLocalStorage } from "@/utils/localStorage.util";
import React from "react";
import { RiBriefcaseLine, RiCloseLine, RiDashboardLine, RiLogoutBoxRLine, RiMenu3Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

const optionsSidebar = [
  {
    name: 'Profesores',
    icon: <RiDashboardLine/>
  },
  {
    name: 'Estudiantes',
    icon: <RiBriefcaseLine/>
  }
];

export const Sidebar: React.FC = () => {
  const [sidebar, setSidebar] = React.useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="min-h-screen grid grid-col-1 lg:grid-cols-6">
      <div
        className={`fixed lg:static w-[80%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${
          sidebar ? "left-0" : "-left-full"
        } h-full overflow-y-auto col-span-1 p-8 border-r`}
      >
        <div className="text-center p-8">
          <h1 className="uppercase font-bold tracking-[4px]">DASHBOARD</h1>
        </div>
        <div className="flex flex-col justify-between h-[800px]">
          <nav>
            <ul>
              {optionsSidebar.map((opt) => (
                <Option
                  key={opt.name}
                  to=""
                  icon={opt.icon}
                  name={opt.name}
                />
              ))}
            </ul>
          </nav>
          <Reminder />
        </div>
      </div>
      <button
        onClick={handleSidebar}
        className="block lg:hidden fixed bottom-4 right-4 bg-primary p-2 text-white rounded-full text-2xl z-40"
      >
        {sidebar ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      <div className="px-16 pt-10 lg:col-span-5">
        <Outlet />
      </div>
    </div>
  );
}

function Reminder() {
  const navigate = useNavigate()
  const distpath = useDispatch<AppDispatch>()
  const handleLogout = () => {
    clearLocalStorage(config.TOKEN_STORAGE)
    distpath(resetUser())
    navigate(PublicRoutes.LOGIN, {replace: true})
  };

  return (
    <div className="flex flex-col gap-4">
      <img src="./img/sidebar.svg" alt="Image" />
      <div className="bg-primary bg-opacity-10 p-8 flex flex-col gap-4 rounded-3xl">
        <h3 className="text-xl text-center">RECORDATORIO</h3>
        <p className="text-gray-500 text-center">
          Toda informacion mostrada en las tablas es confidencial.
        </p>
      </div>
      <button onClick={handleLogout} className="flex items-center gap-4 hover:bg-primary hover:bg-opacity-70 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold">
        <RiLogoutBoxRLine/>
        Cerrar Sesión
      </button>
    </div>
  )
}

function Option({...props}: {to: string, icon: JSX.Element, name: string}) {
  return (
    <Link
      to={props.to}
      className="flex items-center gap-4 hover:bg-primary hover:bg-opacity-70 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
    >
      {props.icon}
      {props.name}
    </Link>
  )
}
