import { config } from '@/config';
import { StudentDto } from '@/services/dtos/student.dto';
import { getStudent, updateStudent } from '@/services/student.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const StudentById: React.FC = () => {
  const { studentId } = useParams();
  const [update, setUpdate] = React.useState<boolean>(false);

  const { data: studentData } = useQuery({
    queryKey: [config.QUERY_KEY.STUDENT_BY_ID, studentId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getStudent(studentId!),
  });

  const [student, setStudent] = React.useState<StudentDto>({
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
  });

  React.useEffect(() => {
    if (studentData) {
      setStudent(studentData);
    }
  }, [studentData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await updateStudent(studentId!, student);
      toast.success('Estudiante actualizado exitosamente');
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
              src='https://img.freepik.com/vector-gratis/linda-estudiante-mascarilla-limpieza-manos-jabon-manos-virus-proteccion-covid19_40876-3285.jpg'
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
                      <input type='text' id='dni' name='dni' value={student.dni} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='name' className='text-xl font-semibold'>
                      Nombre:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='name' name='name' value={student.name} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='lastName' className='text-xl font-semibold'>
                      Apellido paterno:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='lastName' name='lastName' value={student.lastName} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='motherLastName' className='text-xl font-semibold'>
                      Apellido materno:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='motherLastName' name='motherLastName' value={student.motherLastName} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='email' className='text-xl font-semibold'>
                      Email:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='email' name='email' value={student.email} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='phoneNumber' className='text-xl font-semibold'>
                      Celular:
                    </label>
                    <div className='mb-4'>
                      <input type='number' id='phoneNumber' name='phoneNumber' value={student.phoneNumber} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='address' className='text-xl font-semibold'>
                      Direccion:
                    </label>
                    <div className='mb-4'>
                      <input type='text' id='address' name='address' value={student.address} onChange={handleInputChange} className='border rounded p-2' />
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded'>
                    Guardar cambios
                  </button>

                  <button onClick={() => setUpdate(false)} className='bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded'>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center bg-gray-100'>
          <div className='bg-white p-8 rounded-lg shadow-lg flex gap-8 items-center'>
            <img
              src='https://img.freepik.com/vector-gratis/linda-estudiante-mascarilla-limpieza-manos-jabon-manos-virus-proteccion-covid19_40876-3285.jpg'
              alt='Imagen del estudiante'
              className='w-1/2 h-auto rounded-full mr-4'
            />
            <div className='w-1/2 grid gap-4'>
              <h2 className='text-4xl font-bold mb-2'>
                {studentData?.name} {studentData?.lastName} {studentData?.motherLastName}
              </h2>
              <div>
                <p className='text-xl'>
                  <span className='font-semibold'>Grado:</span> {studentData?.degrees.name} {studentData?.degrees.academicLevel}
                </p>
                <p className='text-xl'>
                  <span className='font-semibold'>Salón y Turno:</span> Salón {studentData?.degrees.assignedRoom} - {studentData?.shifts.name}
                </p>
              </div>
              <div className='text-gray-600 flex flex-col'>
                <div>
                  <span className='font-semibold'>Cursos:</span>
                  <ul className='list-disc ml-8'>
                    {studentData?.courses.map((course) => (
                      <li key={course.id}>{course.name}</li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span className='font-semibold'>Email: </span> {studentData?.email}
                </p>
                <p>
                  <span className='font-semibold'>DNI: </span> {studentData?.dni}
                </p>
                <p>
                  <span className='font-semibold'>Número de Teléfono: </span>
                  <a className='underline' href={`https://api.whatsapp.com/send?phone=${studentData?.phoneNumber}`} target='_blank'>
                    {studentData?.phoneNumber}
                  </a>
                </p>
                <p>
                  <span className='font-semibold'>Dirección:</span>{' '}
                  <a className='underline' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studentData?.address ?? '')}`} target='_blank'>
                    {studentData?.address}
                  </a>
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
    // {update  }
  );
};
