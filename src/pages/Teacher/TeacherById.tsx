import { config } from '@/config';
import { TeacherDto } from '@/services/dtos/teacher.dto';
import { getTeacher, updateTeacher } from '@/services/teacher.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const TeacherById: React.FC = () => {
  const { teacherId } = useParams();
  const [update, setUpdate] = React.useState<boolean>(false);

  const { data: teacherData } = useQuery({
    queryKey: [config.QUERY_KEY.TEACHER_BY_ID, teacherId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getTeacher(teacherId!),
  });

  const [teacher, setTeacher] = React.useState<TeacherDto>({
    dni: '',
    name: '',
    lastName: '',
    motherLastName: '',
    email: '',
    phoneNumber: '',
    address: '',

    courses: '',
    degrees: '',
    shifts: '',
    qualification: '',
  });

  React.useEffect(() => {
    if (teacherData) {
      setTeacher(teacherData);
    }
  }, [teacherData]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = await getTeacher(teacherId!);
        setTeacher(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await updateTeacher(teacherId!, teacher);
      toast.success('Profesor actualizado exitosamente');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const updatedTeacherData = await getTeacher(teacherId!);
      setTeacher(updatedTeacherData);
      setUpdate(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {update ? (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
          <div className='bg-white p-8 rounded-lg shadow-lg flex gap-8 items-center'>
            <img
              src='https://img.freepik.com/vector-gratis/feliz-dia-maestro-estudiante-maestro-dibujos-animados_40876-3612.jpg'
              alt='Imagen del estudiante'
              className='w-1/2 h-auto rounded-full mr-4'
            />
            <div className='w-1/2 grid gap-4'>
              <h2 className='text-4xl font-bold mb-2'>Actualizar:</h2>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
                  <div>
                    <label htmlFor='dni' className='text-xl font-semibold'>
                      DNI:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='dni' name='dni' value={teacher.dni} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='name' className='text-xl font-semibold'>
                      Nombre:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='name' name='name' value={teacher.name} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='lastName' className='text-xl font-semibold'>
                      Apellido paterno:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='lastName' name='lastName' value={teacher.lastName} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='motherLastName' className='text-xl font-semibold'>
                      Apellido materno:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='motherLastName' name='motherLastName' value={teacher.motherLastName} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='email' className='text-xl font-semibold'>
                      Email:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='email' name='email' value={teacher.email} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='phoneNumber' className='text-xl font-semibold'>
                      Celular:
                    </label>
                    <div className='mb-4'>
                      <input type='number' id='phoneNumber' name='phoneNumber' value={teacher.phoneNumber} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='address' className='text-xl font-semibold'>
                      Direccion:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='address' name='address' value={teacher.address} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded'>
                    Guardar cambios
                  </button>

                  <button onClick={() => setUpdate(false)} className='bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded'>
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
          <div className='bg-white p-8 rounded-lg shadow-lg flex gap-8 items-center'>
            <img
              src='https://img.freepik.com/vector-gratis/feliz-dia-maestro-estudiante-maestro-dibujos-animados_40876-3612.jpg'
              alt='Imagen del profesor'
              className='w-1/2 h-auto rounded-full mr-4'
            />
            <div className='w-1/2 grid gap-4'>
              <h2 className='text-4xl font-bold mb-2'>
                {teacher?.name} {teacher?.lastName} {teacher?.motherLastName}
              </h2>
              <div>
                <p className='text-xl'>
                  <span className='font-semibold'>Cursos: </span>
                  {teacher?.courses.name}
                </p>
                <span className=''>{teacher?.courses.description}</span>
                <p className='text-xl'>
                  <span className='font-semibold'>Turno:</span> {teacher?.shifts.name}
                </p>
              </div>
              <div className='text-gray-600 flex flex-col'>
                <div>
                  <span className='font-semibold'>Salones encargados:</span>
                  <ul className='list-disc ml-8'>
                    {teacherData?.degrees.map((degree) => (
                      <li key={degree.id}>
                        Grado: {degree.name} - Salon: {degree.assignedRoom} - Nivel: {degree.academicLevel}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span className='font-semibold'>Email: </span> {teacher?.email}
                </p>
                <p>
                  <span className='font-semibold'>DNI: </span> {teacher?.dni}
                </p>
                <p>
                  <span className='font-semibold'>Número de Teléfono: </span>
                  <a className='underline' href={`https://api.whatsapp.com/send?phone=${teacher?.phoneNumber}`} target='_blank' rel='noopener noreferrer'>
                    {teacher?.phoneNumber}
                  </a>
                </p>
                <p>
                  <span className='font-semibold'>Dirección:</span>{' '}
                  <a className='underline' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(teacher?.address ?? '')}`} target='_blank' rel='noopener noreferrer'>
                    {teacher?.address}
                  </a>
                </p>
                <p>
                  <span className='font-semibold'>Calificación:</span> {teacher?.qualification.name}
                </p>
              </div>
              <button onClick={() => setUpdate(true)} className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded'>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
