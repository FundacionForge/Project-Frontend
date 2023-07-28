import { PrivateRoutes } from '@/models';
import { FC } from 'react'
import { Link } from 'react-router-dom';

export const NotFound404: FC = () => {
  return (
    <section className="dark:bg-[#111827] h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-gray-300 mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Algo falta, algo está faltando.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Lo sentimos, no podemos encontrar esa página. Encontrará mucho para explorar en la página de inicio. </p>
          <Link to={`/${PrivateRoutes.PRIVATE}`} className="bg-primary inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Volver a la página de inicio</Link>
        </div>
      </div>
    </section>
  );
}
