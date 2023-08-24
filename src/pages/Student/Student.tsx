import { CheckBoxCustom } from '@/components/CheckBoxCustom';
import { InputCustom } from '@/components/InputCustom';
import { SelectCustom } from '@/components/SelectCustom';
import { config } from '@/config';
import { getAllCourse } from '@/services/course.service';
import { getAllDegree } from '@/services/degree.service';
import { getAllShift } from '@/services/shift.service';
import { createStudent, deleteStudent, getAllStudent } from '@/services/student.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Modal, Table } from 'flowbite-react';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import * as Yup from 'yup';

const header = [{ name: 'Dni' }, { name: 'Nombre y apellidos' }, { name: 'Email' }, { name: 'Celular' }, { name: 'Dirección' }];

export const Student: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: students } = useQuery({
    queryKey: [config.QUERY_KEY.STUDENT],
    queryFn: getAllStudent,
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries([config.QUERY_KEY.STUDENT]);
    },
  });

  return (
    <div>
      <div className='mb-20 flex justify-between'>
        <h1 className='text-4xl font-bold uppercase'>Lista de alumnos</h1>
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
          {students?.data && students?.data.length > 0 ? (
            students?.data.map((student) => (
              <Table.Row key={student.id}>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{student.dni}</Table.Cell>
                <Table.Cell>
                  {student.name} {student.lastName} {student.motherLastName}
                </Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.phoneNumber}</Table.Cell>
                <Table.Cell>{student.address}</Table.Cell>
                <Table.Cell className='flex gap-5 text-center'>
                  <button onClick={() => deleteStudentMutation.mutate(student.id)} className='font-medium text-red-600 hover:text-red-400 text-[1.25rem]'>
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
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  dni: Yup.string().required('El DNI es requerido'),
  lastName: Yup.string().required('El apellido paterno es requerido'),
  motherLastName: Yup.string().required('El apellido materno es requerido'),
  address: Yup.string().required('La dirección es requerida'),
  phoneNumber: Yup.string().required('El celular es requerido'),
  courses: Yup.array().of(Yup.number().required('Cada curso es requerido')).required('Los cursos son requeridos'),
  degrees: Yup.string().required('El grado es requerido'),
  shifts: Yup.string().required('El turno es requerido'),
});

const initialValues = {
  email: '',
  name: '',
  dni: '',
  lastName: '',
  motherLastName: '',
  address: '',
  phoneNumber: '',
  courses: [],
  degrees: '',
  shifts: '',
};

function FormElements() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const addStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries([config.QUERY_KEY.STUDENT]);
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

  return (
    <>
      <Button className='bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90' onClick={() => props.setOpenModal('form-elements')}>
        Añade Nuevo Alumno
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
                addStudentMutation.mutate(values);
                console.log(values);
                console.log('hola');
              }}
            >
              {({ errors, values }) => (
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
                      <Label value='Selecciona los cursos' />
                    </div>
                    <div className='grid grid-cols-2'>
                      {courses?.data.map((course) => (
                        <CheckBoxCustom key={course.id} textLabel={course.name} name='courses' value={course.id} />
                      ))}
                      <ErrorMessage name='courses' component='div' />
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
                      <SelectCustom textLabel='Nivel de grado' name='degrees'>
                        {degrees?.data.map((degree) => (
                          <option value={degree.id} key={degree.id}>
                            {degree.name} {degree.academicLevel}
                          </option>
                        ))}
                      </SelectCustom>
                    </div>
                  </div>

                  <div className='w-full mt-5'>
                    <button
                      className='bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90 w-full'
                      onClick={(e) => {
                        e.preventDefault();
                        console.log({ errors, values });
                      }}
                      // type='submit'
                    >
                      Crear
                    </button>
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
