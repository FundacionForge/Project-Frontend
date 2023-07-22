import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import React from 'react';
import { Sidebar } from '../components/shared/Sidebar';

const data = [
  {
    id: 1,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  },
  {
    id: 2,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  },
  {
    id: 3,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  },
  {
    id: 4,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  },
  {
    id: 5,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  },
  {
    id: 6,
    name: 'Marcos',
    lastname: 'Alanya Pacheco',
    age: 22,
    email: 'marcos@gmail.com',
    cellphone: 934737663,
    address: 'Av Nueva Generacion'
  }
]

export const TableTeacher: React.FC = () => {
  return (
    <Sidebar>
        <div className='mb-20 flex justify-between'>
          <h1 className='text-4xl font-bold uppercase'>Lista de profesores</h1>
          <FormElements />
        </div>

        <Table hoverable>
          <Table.Head className='text-center'>
            <Table.HeadCell>
              Nombre y Apellido
            </Table.HeadCell>
            <Table.HeadCell>
              Edad
            </Table.HeadCell>
            <Table.HeadCell>
              Email
            </Table.HeadCell>
            <Table.HeadCell>
              Celular
            </Table.HeadCell>
            <Table.HeadCell>
              Dirección
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Opciones
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center">
            {data.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {row.name} {row.lastname}
                </Table.Cell>
                <Table.Cell>
                  {row.age}
                </Table.Cell>
                <Table.Cell>
                  {row.email}
                </Table.Cell>
                <Table.Cell>
                  {row.cellphone}
                </Table.Cell>
                <Table.Cell>
                  {row.address}
                </Table.Cell>
                <Table.Cell className='flex gap-5 text-center'>
                  <a
                    className="font-medium text-green-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                  >
                    <p>
                      Ver
                    </p>
                  </a>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                  >
                    <p>
                      Modificar
                    </p>
                  </a>
                  <a
                    className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                  >
                    <p>
                      Eliminar
                    </p>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
    </Sidebar>
  );
}

function FormElements() {
  const [openModal, setOpenModal] = React.useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button onClick={() => props.setOpenModal('form-elements')}>Añade Nuevo Profesor</Button>
      <Modal show={props.openModal === 'form-elements'} size="xl" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crear nuevo profesor</h3>
            <form>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Correo Electronico" />
                </div>
                <TextInput id="email" type='text' placeholder="name@company.com" required />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Nombre" />
                  </div>
                  <TextInput id="name" type="text" required />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastname" value="Apellidos" />
                  </div>
                  <TextInput id="lastname" type="text" required />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="adress" value="Dirección" />
                </div>
                <TextInput id="adress" type="text" required />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="age" value="Edad" />
                  </div>
                  <TextInput id="age" type="number" required />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="cellphone" value="Celular" />
                  </div>
                  <TextInput id="cellphone" type="text" required />
                </div>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Contraseña" />
                </div>
                <TextInput id="password" type="password" required />
              </div>

              <div className="w-full mt-5">
                <Button type="submit" className="w-full">Crear</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
