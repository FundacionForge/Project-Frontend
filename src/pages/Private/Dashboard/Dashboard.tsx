import { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <main>
      <h1 className='text-4xl font-bold'>DASHBOARD</h1>
      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 mt-10 gap-8">
        <TemplateCardForge />
        <TemplateCardCourse />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        <TemplateCardPerson />
        <TemplateCardPerson />
      </section>
    </main>
  );
}

export default Dashboard;

function TemplateCardForge() {
  return (
    <>
      <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl dark:bg-slate-800">
        <img src="/img/logo.png" alt="img-logo" />
      </div>

      <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl dark:bg-slate-800">
        <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl">
          <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
            1
          </span>
          <div>
            <h3 className="font-bold">Marcos Alanya</h3>
            <p className="text-gray-500">22 años</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl">
          <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
            2
          </span>
          <div>
            <h3 className="font-bold">Marcos Alanya</h3>
            <p className="text-gray-500">22 años</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl">
          <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
            3
          </span>
          <div>
            <h3 className="font-bold">Marcos Alanya</h3>
            <p className="text-gray-500">22 años</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl">
          <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
            4
          </span>
          <div>
            <h3 className="font-bold">Marcos Alanya</h3>
            <p className="text-gray-500">22 años</p>
          </div>
        </div>
      </div>
    </>
  )
}

function TemplateCardCourse() {
  return (
    <div className="col-span-1 md:col-span-2 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 dark:bg-black">Materias</h1>
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          {/* <img
            src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
            className="w-14 h-14 object-cover rounded-full"
          /> */}
          <div>
            <h3 className="font-bold">Logo design for Bakery</h3>
            <p className="text-gray-500">1 day remaining</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          {/* <img
            src="https://img.freepik.com/foto-gratis/retrato-mujer-mayor-cerca_23-2149207185.jpg"
            className="w-14 h-14 object-cover rounded-full"
          /> */}
          <div>
            <h3 className="font-bold">Logo design for Bakery</h3>
            <p className="text-gray-500">1 day remaining</p>
          </div>
        </div>
        <div className="flex justify-end">
          <a
            href="#"
            className="hover:text-primary-100 transition-colors hover:underline"
          >
            Ver Todas las materias
          </a>
        </div>
      </div>
    </div>
  )
}

function TemplateCardPerson() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Profesores</h1>
      <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
        {/* Card 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
          <div className="col-span-2 flex items-center gap-4">
            <img
              src="https://img.freepik.com/foto-gratis/hombre-joven-hermoso-contento-camiseta-azul-que-senala-lado_1262-17845.jpg"
              className="w-14 h-14 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-bold">Alexander Williams</h3>
              <p className="text-gray-500">Matematicas</p>
            </div>
          </div>
          <div>
            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
              Activo
            </span>
          </div>
          <div>
            <span className="font-bold">S/. 1,200.87</span>
          </div>

        </div>
        {/* Card 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
          <div className="col-span-2 flex items-center gap-4">
            <img
              src="https://img.freepik.com/foto-gratis/alegre-joven-deportista-posando-mostrando-pulgares-arriba-gesto_171337-8194.jpg"
              className="w-14 h-14 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-bold">Jhon Philips</h3>
              <p className="text-gray-500">Historia</p>
            </div>
          </div>
          <div>
            <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
              Despedido
            </span>
          </div>
          <div>
            <span className="font-bold">S/. 12,998.88</span>
          </div>
        </div>
        <div className="flex justify-end">
          <a
            href="#"
            className="hover:text-primary-100 transition-colors hover:underline"
          >
            Ver todos los profesores
          </a>
        </div>
      </div>
    </div>
  )
}
