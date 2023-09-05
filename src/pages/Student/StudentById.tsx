import { config } from '@/config';
import { getStudent } from '@/services/student.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

export const StudentById: React.FC = () => {
  const { studentId } = useParams();

  const { data: student } = useQuery({
    queryKey: [config.QUERY_KEY.STUDENT_BY_ID, studentId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getStudent(studentId!),
  });

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg flex items-center'>
        <img src='https://img.freepik.com/vector-gratis/ilustracion-concepto-tesis_114360-7560.jpg' alt='Imagen del estudiante' className='w-1/2 h-auto rounded-full mr-4' />
        <div className='w-1/2 grid gap-4'>
          <h2 className='text-4xl font-bold mb-2'>
            {student?.name} {student?.lastName} {student?.motherLastName}
          </h2>
          <div>
            <p className='text-xl'>
              <span className='font-semibold'>Grado:</span> {student?.degrees.name} {student?.degrees.academicLevel}
            </p>
            <p className='text-xl'>
              <span className='font-semibold'>Salón y Turno:</span> Salón {student?.degrees.assignedRoom} - {student?.shifts.name}
            </p>
          </div>
          <div className='text-gray-600 flex flex-col'>
            <div>
              <span className='font-semibold'>Cursos:</span>
              <ul className='list-disc ml-8'>
                {student?.courses.map((course) => (
                  <li key={course.id}>{course.name}</li>
                ))}
              </ul>
            </div>
            <p>
              <span className='font-semibold'>Email: </span> {student?.email}
            </p>
            <p>
              <span className='font-semibold'>DNI: </span> {student?.dni}
            </p>
            <p>
              <span className='font-semibold'>Número de Teléfono: </span>
              <a className='underline' href={`https://api.whatsapp.com/send?phone=${student?.phoneNumber}`} target='_blank'>
                {student?.phoneNumber}
              </a>
            </p>
            <p>
              <span className='font-semibold'>Dirección:</span>{' '}
              <a className='underline' href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(student?.address ?? '')}`} target='_blank'>
                {student?.address}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
