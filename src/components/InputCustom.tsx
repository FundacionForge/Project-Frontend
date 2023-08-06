import { TextInput } from 'flowbite-react';
import { useFormikContext } from 'formik';

interface MyProps {
  name: string;
}
export const InputCustom = ({ name }: MyProps) => {
  const { values, handleChange, touched, errors } = useFormikContext<any>();
  return (
    <>
      <TextInput name={name} value={values[name]} id={name} onChange={handleChange} />
      {errors[name] && touched[name] && <div className='text-red-500'>{errors[name] as any}</div>}
    </>
  );
};
