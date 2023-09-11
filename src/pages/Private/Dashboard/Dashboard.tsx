import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { config } from '@/config';
import { getAllStudent } from '@/services/student.service';
import { getAllTeacher } from '@/services/teacher.service';
import { Link } from 'react-router-dom';
import { getAllCourse } from '@/services/course.service';
import { Course } from '@/services/entities/courses.entity';

interface PersonProps {
  [key: string]: any;
  type: string;
}

interface CoursesProps {
  [key: string]: any;
}

const Dashboard: FC = () => {
  const { data: dataTeachers } = useQuery({
    queryKey: [config.QUERY_KEY.TEACHER],
    queryFn: getAllTeacher,
  });

  const { data: dataStudents } = useQuery({
    queryKey: [config.QUERY_KEY.STUDENT],
    queryFn: getAllStudent,
  });

  const { data: dataCourses } = useQuery({
    queryKey: [config.QUERY_KEY.COURSE],
    queryFn: getAllCourse,
  });

  return (
    <main>
      <h1 className='text-4xl font-bold dark:text-gray-300'>DASHBOARD</h1>
      <section className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  mt-10 gap-8'>
        <TemplateCardForge />
        <TemplateCardCourse data={dataCourses?.data} />
      </section>
      <section className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-8'>
        <TemplateCardTeacher type='Profesores' data={dataTeachers?.data} />
        <TemplateCardStudent type='Estudiantes' data={dataStudents?.data} />
      </section>
    </main>
  );
};

export default Dashboard;

function TemplateCardForge() {
  return (
    <>
      <div className='p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl dark:bg-slate-800'>
        <img src='/img/logo.png' alt='img-logo' />
      </div>
    </>
  );
}

function TemplateCardCourse({ data }: CoursesProps) {
  return (
    <div className='col-span-1 md:col-span-2 flex flex-col '>
      <h1 className='text-2xl font-bold mb-8 dark:text-gray-300'>Materias</h1>
      <div className='bg-white p-8 rounded-xl shadow-2xl dark:bg-slate-800 ' style={{ overflowY: 'scroll', height: '400px' }}>
        {data && data.length > 0
          ? data.map((course: Course) => (
              <div key={course.id} className='flex items-center gap-4 mb-8'>
                <img src={course?.image} className='w-14 h-14 object-cover rounded-full' />
                <div>
                  <h3 className='font-bold dark:text-white'>{course?.name}</h3>
                  <p className='text-gray-500'>{course?.description}</p>
                </div>
              </div>
            ))
          : 'No existen cursos'}
      </div>
    </div>
  );
}

function TemplateCardStudent({ type, data }: PersonProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-8 dark:text-gray-300'>{type}</h1>
      <div className='bg-white p-8 rounded-xl shadow-2xl flex flex-col gap-8 w-full dark:bg-slate-800'>
        <>
          {data && data?.length > 0 ? (
            data?.slice(0, 2).map((dataValue: any) => (
              <>
                <div className='grid grid-cols-2 items-center w-full gap-4 '>
                  <div className='flex items-center gap-4'>
                    <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png ' className='w-14 h-14 object-cover rounded-xl' />
                    <div>
                      <Link to={`/private/${type === 'Profesores' ? 'teacher' : 'student'}/${dataValue?.id}`}>
                        <h3 className='font-bold dark:text-white'>
                          {dataValue?.name} {dataValue?.lastName}
                        </h3>
                      </Link>
                      <p className='text-gray-500'>
                        {' '}
                        Turno:{' '}
                        {type === 'Profesores'
                          ? dataValue?.qualification && dataValue?.qualification.lenght > 0
                            ? dataValue?.qualification.map((qual: any) => `${qual?.name}`)
                            : 'Sin especializaciones'
                          : dataValue?.shifts.name}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <span className='badge py-1 px-3 font-small border border-dark-subtle rounded-pill dark:text-white '>{dataValue?.email}</span>
                  </div>
                </div>
                <div className='flex flex-row items-center w-full '>
                  <ul className='grid grid-cols-2 gap-4 w-full'>
                    {dataValue?.courses && dataValue?.courses.length > 0 ? (
                      dataValue?.courses.map((course: any) => (
                        <li>
                          <a
                            href='#'
                            className='flex items-center text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'
                          >
                            <img className='rounded-full w-9 h-9' src={course?.image} alt='profile picture' />
                            <div className=' font-medium dark:text-white text-left'>
                              <span className='flex-1 ml-3 whitespace-nowrap'>{course?.name}</span>
                            </div>
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>No existen cursos inscritos</li>
                    )}
                  </ul>
                </div>
              </>
            ))
          ) : (
            <div className='grid justify-items-center items-center'>
              <img className='w-20 h-20 space-y-6' src='https://img.freepik.com/free-icon/surprised_318-463920.jpg?w=2000' alt='profile picture' />
              <h2 className='my-3 text-black-600 font-bold'>No existen {type}, porfavor crea uno</h2>
            </div>
          )}
        </>

        <div className='flex justify-end'>
          <Link to={`/private/${type === 'Profesores' ? 'teacher' : 'student'}`}>
            <a href='#' className='hover:text-primary-100 transition-colors hover:underline'>
              Ver todos los {type === 'Profesores' ? 'profesores' : 'estudiantes'}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TemplateCardTeacher({ type, data }: PersonProps) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-8 dark:text-gray-300'>{type}</h1>
      <div className='bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8 dark:bg-slate-800'>
        <>
          {data && data?.length > 0 ? (
            data?.slice(0, 2).map((dataValue: any) => (
              <>
                <div className='grid grid-cols-2 items-center gap-4'>
                  <div className='flex items-center gap-4'>
                    <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png ' className='w-14 h-14 object-cover rounded-xl' />
                    <div>
                      <Link to={`/private/${type === 'Profesores' ? 'teacher' : 'student'}/${dataValue?.id}`}>
                        <h3 className='font-bold dark:text-white'>
                          {dataValue?.name} {dataValue?.lastName}
                        </h3>
                      </Link>
                      <p className='text-gray-500'>{dataValue.qualification.name}</p>
                    </div>
                  </div>
                  <div className='flex justify-end dark:text-white'>
                    <span className='badge py-1 px-3 font-small border border-dark-subtle rounded-pill'>{dataValue?.email}</span>
                  </div>
                </div>
                <div className='flex flex-row items-center'>
                  <ul className='grid gap-2 w-full'>
                    {dataValue?.degrees && dataValue?.degrees.length > 0 ? (
                      dataValue?.degrees.map((degree: any) => (
                        <li>
                          <a
                            href='#'
                            className='flex items-center text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'
                          >
                            <div className=' font-medium dark:text-white text-left'>
                              <span className='flex-1 ml-3 whitespace-nowrap'>
                                Grado: {degree.name} - Salon: {degree.assignedRoom} - Nivel: {degree.academicLevel}
                              </span>
                            </div>
                          </a>
                        </li>
                      ))
                    ) : (
                      <li>No existen cursos inscritos</li>
                    )}
                  </ul>
                </div>
              </>
            ))
          ) : (
            <div className='grid justify-items-center items-center'>
              <img className='w-20 h-20 space-y-6' src='https://img.freepik.com/free-icon/surprised_318-463920.jpg?w=2000' alt='profile picture' />
              <h2 className='my-3 text-black-600 font-bold'>No existen {type}, porfavor crea uno</h2>
            </div>
          )}
        </>

        <div className='flex justify-end'>
          <Link to={`/private/${type === 'Profesores' ? 'teacher' : 'student'}`}>
            <a href='#' className='hover:text-primary-100 transition-colors hover:underline'>
              Ver todos los {type === 'Profesores' ? 'profesores' : 'estudiantes'}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
