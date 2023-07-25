import { config } from "@/config";
import { PublicRoutes } from "@/models";
import { resetUser } from "@/redux/state/userSlice";
import { AppDispatch, AppStore } from "@/redux/store";
import { clearLocalStorage } from "@/utils/localStorage.util";
import React from "react";
import { RiBriefcaseLine, RiCloseLine, RiDashboardLine, RiLogoutBoxRLine, RiMenu3Fill, RiSurveyLine, RiUser2Line, RiUser3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
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
  const userState = useSelector((store: AppStore) => store.user)

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
          <h1 className="uppercase font-bold tracking-[4px]">{userState.username}</h1>
        </div>
        {/* <div className="flex flex-col justify-between h-[800px]">
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
        </div> */}

        <div className="flex flex-col justify-between h-[800px]">
          <nav>
            <h5 className="uppercase font-bold text-xs text-primary tracking-[2px] mb-4">Registros</h5>
            <ul>
              <li>
                <Link to={""} className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                  <RiUser2Line className="text-[1.25rem]"/>
                  <span>Profesores</span>
                </Link>
              </li>
              <li>
                <Link to={""} className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                  <RiUser3Line className="text-[1.25rem]"/>
                  <span>Alumnos</span>
                </Link>
              </li>
              <li>
                <Link to={""} className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                  <RiSurveyLine className="text-[1.25rem]"/>
                  <span>Materias</span>
                </Link>
              </li>
            </ul>
            <h5 className="uppercase font-bold text-xs text-primary tracking-[2px] my-4">Otros</h5>
            <ul>
              <li>
                <Link to={""} className="flex items-center gap-4 p-2 hover:bg-gray-200 transition-colors rounded-lg">
                  <RiSurveyLine className="text-[1.25rem]"/>
                  <span>...Proximamente</span>
                </Link>
              </li>
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
      <img src="/img/sidebar.svg" alt="Image" />
      <div className="bg-primary bg-opacity-10 p-8 flex flex-col gap-4 rounded-3xl">
        <h3 className="text-xl text-center">RECORDATORIO</h3>
        <p className="text-gray-500 text-center">
          Toda informacion mostrada en las tablas es confidencial.
        </p>
      </div>
      <button onClick={handleLogout} className="flex items-center gap-4 hover:bg-primary hover:bg-opacity-80 p-4 hover:text-white rounded-lg transition-colors font-semibold">
        <RiLogoutBoxRLine/>
        Cerrar Sesión
      </button>
    </div>
  )
}
