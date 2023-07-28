import { createStudent, deleteStudent, getAllStudent } from '@/services/studentService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Label, Modal, Table } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import * as Yup from 'yup';

const header = [
  { name: 'Dni' },
  { name: 'Nombre y apellidos' },
  { name: 'Email' },
  { name: 'Celular' },
  { name: 'Dirección' },
]

export const Student: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: students,
  } = useQuery({
    queryKey: ['students'],
    queryFn: getAllStudent,
  });


  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
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
            <span className="sr-only">Opciones</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y text-center">
        {students && students.length > 0 ? (
          students.map((student) => (
            <Table.Row key={student.id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.dni}</Table.Cell>
              <Table.Cell>{student.name} {student.lastName} {student.motherLastName}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.phoneNumber}</Table.Cell>
              <Table.Cell>{student.address}</Table.Cell>
              <Table.Cell className='flex gap-5 text-center'>
                <button
                  onClick={() => deleteStudentMutation.mutate(student.id)}
                  className="font-medium text-red-600 hover:text-red-400 text-[1.25rem]"
                ><RiDeleteBin2Line /></button>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={5} className="text-center">No hay datos alumnos registrados</Table.Cell>
          </Table.Row>
        )}
        </Table.Body>
      </Table>
  </div>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  dni: Yup.string().required('El DNI es requerido'),
  lastName: Yup.string().required('El apellido paterno es requerido'),
  motherLastName: Yup.string().required('El apellido materno es requerido'),
  address: Yup.string().required('La dirección es requerida'),
  phoneNumber: Yup.string().required('El celular es requerido'),
});

const initialValues = {
  email: '',
  name: '',
  dni: '',
  lastName: '',
  motherLastName: '',
  address: '',
  phoneNumber: '',
};

function FormElements() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const addStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(['students']);
    },
  });
  return (
    <>
      <Button className="bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90" onClick={() => props.setOpenModal('form-elements')}>
        Añade Nuevo Profesor
      </Button>
      <Modal show={props.openModal === 'form-elements'} size="xl" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crear nuevo profesor</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                addStudentMutation.mutate(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Correo Electrónico" />
                    </div>
                    <Field type="email" id="email" name="email" placeholder="name@company.com" required />
                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Nombre" />
                      </div>
                      <Field type="text" id="name" name="name" required />
                      {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="dni" value="DNI" />
                      </div>
                      <Field type="number" id="dni" name="dni" required />
                      {errors.dni && touched.dni && <div className="text-red-500">{errors.dni}</div>}
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Apellido paterno" />
                      </div>
                      <Field type="text" id="lastName" name="lastName" required />
                      {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="motherLastName" value="Apellido materno" />
                      </div>
                      <Field type="text" id="motherLastName" name="motherLastName" required />
                      {errors.motherLastName && touched.motherLastName && <div className="text-red-500">{errors.motherLastName}</div>}
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="address" value="Dirección" />
                      </div>
                      <Field type="text" id="address" name="address" required />
                      {errors.address && touched.address && <div className="text-red-500">{errors.address}</div>}
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="phoneNumber" value="Celular" />
                      </div>
                      <Field type="number" id="phoneNumber" name="phoneNumber" required />
                      {errors.phoneNumber && touched.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
                    </div>
                  </div>

                  <div className="w-full mt-5">
                    <Button className="bg-primary enabled:hover:bg-primary enabled:hover:bg-opacity-90 w-full" type="submit">Crear</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
