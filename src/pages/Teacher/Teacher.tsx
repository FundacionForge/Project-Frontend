import { CheckBoxCustom } from '@/components/CheckBoxCustom';
import { InputCustom } from '@/components/InputCustom';
import { SelectCustom } from '@/components/SelectCustom';
import { config } from '@/config';
import { getAllCourse } from '@/services/course.service';
import { getAllDegree } from '@/services/degree.service';
import { getAllQualification } from '@/services/qualification.service';
import { getAllShift } from '@/services/shift.service';
import { createTeacher, deleteTeacher, getAllTeacher } from '@/services/teacher.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Modal, Table } from 'flowbite-react';
import { Form, Formik } from 'formik';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const header = [{ name: 'Dni' }, { name: 'Nombre y Apellido' }, { name: 'Email' }, { name: 'Celular' }, { name: 'Dirección' }];

export const Teacher: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: teachers } = useQuery({
    queryKey: [config.QUERY_KEY.TEACHER],
    queryFn: getAllTeacher,
  });

  const deleteTeacherMutation = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      toast.success('Profesor eliminado exitosamente');
      queryClient.invalidateQueries([config.QUERY_KEY.TEACHER]);
    },
  });

  const handleDeleteClick = (teacherId: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este profesor?');
    if (confirmDelete) {
      deleteTeacherMutation.mutate(teacherId);
    }
  };

  return (
    <div>
      <div className='mb-20 flex justify-between'>
        <h1 className='text-4xl font-bold uppercase'>Lista de profesores</h1>
        <FormElements />
      </div>

      <Table hoverable>
        <Table.Head className='text-center'>
          {header.map((hea) => (
            <Table.HeadCell key={hea.name}>{hea.name}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className='sr-only'>Opciones</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y text-center'>
          {teachers?.data && teachers?.data.length > 0 ? (
            teachers?.data.map((teacher) => (
              <Table.Row key={teacher.id}>
                <Link to={`${teacher.id}`}>
                  <Table.Cell className='whitespace-nowrap font-medium dark:text-white text-blue-500 underline'>{teacher.dni}</Table.Cell>
                </Link>
                <Table.Cell>
                  {teacher.name} {teacher.lastName} {teacher.motherLastName}
                </Table.Cell>
                <Table.Cell>{teacher.email}</Table.Cell>
                <Table.Cell>{teacher.phoneNumber}</Table.Cell>
                <Table.Cell>{teacher.address}</Table.Cell>
                <Table.Cell className='flex gap-5 text-center'>
                  <button onClick={() => handleDeleteClick(teacher.id)} className='font-medium text-red-600 hover:text-red-400 text-[1.25rem]'>
                    <RiDeleteBin2Line />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5} className='text-center'>
                No hay datos alumnos registrados
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  dni: Yup.string().required('El DNI no puede estar en blanco').min(8, 'El DNI debe tener exactamente 8 caracteres').max(8, 'El DNI debe tener exactamente 8 caracteres'),
  name: Yup.string().required('El nombre no puede estar en blanco').min(3, 'El nombre debe tener al menos 3 caracteres').max(10, 'El nombre debe tener como máximo 10 caracteres'),
  lastName: Yup.string().required('El apellido no puede estar en blanco').min(3, 'El apellido debe tener al menos 3 caracteres').max(10, 'El apellido debe tener como máximo 10 caracteres'),
  motherLastName: Yup.string()
    .required('El apellido materno no puede estar en blanco')
    .min(3, 'El apellido materno debe tener al menos 3 caracteres')
    .max(10, 'El apellido materno debe tener como máximo 10 caracteres'),
  email: Yup.string().required('El email no puede estar en blanco').email('El email debe ser válido'),
  phoneNumber: Yup.string()
    .required('El número de teléfono no puede estar en blanco')
    .length(9, 'El número de teléfono debe tener 9 dígitos')
    .test('isNumeric', 'El número de teléfono debe contener solo dígitos', (value) => /^\d+$/.test(value)),
  address: Yup.string().required('La dirección no puede estar en blanco'),
  degrees: Yup.array().required('El grado no puede estar vacío'),
  courses: Yup.mixed().required('El curso no puede estar vacío'),
  shifts: Yup.mixed().required('El turno no puede estar vacío'),
  qualification: Yup.mixed().required('La profesion no puede estar vacío'),
});

const initialValues = {
  email: '',
  name: '',
  dni: '',
  lastName: '',
  motherLastName: '',
  address: '',
  phoneNumber: '',
  courses: '',
  qualification: '',
  degrees: [],
  shifts: '',
};

function FormElements() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const addTeacherMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      toast.success('Profesor creado exitosamente');
      props.setOpenModal(undefined);
      queryClient.invalidateQueries([config.QUERY_KEY.TEACHER]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      props.setOpenModal(undefined);
      const { success, errors } = err.response.data as { msg: string; success: boolean; errors: string[] };
      if (!success) {
        const errorMsg = errors.map((err) => `${err.split(':')[1]} \n`);
        errorMsg.forEach((msg) => {
          toast.error(msg);
        });
      }
    },
  });

  const { data: shifts } = useQuery({
    queryKey: [config.QUERY_KEY.SHIFT],
    queryFn: getAllShift,
  });

  const { data: degrees } = useQuery({
    queryKey: [config.QUERY_KEY.DEGREE],
    queryFn: getAllDegree,
  });

  const { data: courses } = useQuery({
    queryKey: [config.QUERY_KEY.COURSE],
    queryFn: getAllCourse,
  });

  const { data: qualifications } = useQuery({
    queryKey: [config.QUERY_KEY.QUALIFICATION],
    queryFn: getAllQualification,
  });

  return (
    <>
      <Button className='bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90' onClick={() => props.setOpenModal('form-elements')}>
        Añade Nuevo Profesor
      </Button>
      <Modal show={props.openModal === 'form-elements'} size='xl' popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white text-center uppercase'>Crear nuevo alumno</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                addTeacherMutation.mutate(values);
              }}
            >
              {() => (
                <Form>
                  <div>
                    <InputCustom textLabel='Correo Electrónico' name='email' type='text' />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <InputCustom textLabel='Nombre' name='name' type='text' />
                    </div>
                    <div>
                      <InputCustom textLabel='DNI' name='dni' type='number' />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <InputCustom textLabel='Apellido paterno' name='lastName' type='text' />
                    </div>
                    <div>
                      <InputCustom textLabel='Apellido materno' name='motherLastName' type='text' />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <InputCustom textLabel='Dirección' name='address' type='text' />
                    </div>
                    <div>
                      <InputCustom textLabel='Celular' name='phoneNumber' type='number' />
                    </div>
                  </div>

                  <div>
                    <div className='mb-2 block'>
                      <Label value='Selecciona los grados' />
                    </div>
                    <div className='grid grid-cols-2'>
                      {degrees?.data.map((degree) => (
                        <CheckBoxCustom key={degree.id} textLabel={`${degree.name} ${degree.academicLevel}`} name='degrees' value={degree.id} />
                      ))}
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <SelectCustom textLabel='Seleccione el turno' name='shifts'>
                        {shifts?.data.map((shift) => (
                          <option value={shift.id} key={shift.id}>
                            {shift.name}
                          </option>
                        ))}
                      </SelectCustom>
                    </div>

                    <div>
                      <SelectCustom textLabel='Curso a cargo' name='courses'>
                        {courses?.data.map((course) => (
                          <option value={course.id} key={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </SelectCustom>
                    </div>
                  </div>

                  <div>
                    <SelectCustom textLabel='Nivel de Estudios' name='qualification'>
                      {qualifications?.data.map((qualification) => (
                        <option value={qualification.id} key={qualification.id}>
                          {qualification.name}
                        </option>
                      ))}
                    </SelectCustom>
                  </div>

                  <div className='w-full mt-5'>
                    <div className='w-full mt-5'>
                      <Button className='bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90 w-full' type='submit'>
                        Crear
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
