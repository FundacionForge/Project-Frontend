import { config } from '@/config';
import { getTeacher } from '@/services/teacher.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

export const TeacherById: React.FC = () => {
  const { teacherId } = useParams();

  const { data: teacher } = useQuery({
    queryKey: [config.QUERY_KEY.TEACHER_BY_ID, teacherId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => getTeacher(teacherId!),
  });

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg flex gap-8 items-center'>
        <img src='https://img.freepik.com/vector-gratis/feliz-dia-maestro-estudiante-maestro-dibujos-animados_40876-3612.jpg' alt='Imagen del profesor' className='w-1/2 h-auto rounded-full mr-4' />
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
                {teacher?.degrees.map((degree) => (
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
        </div>
      </div>
    </div>
  );
};
