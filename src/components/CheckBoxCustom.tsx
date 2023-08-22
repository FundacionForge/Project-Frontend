import { Checkbox, Label } from 'flowbite-react';
import { useFormikContext } from 'formik';

interface Props {
  name: string;
  textLabel: string;
}
export const CheckBoxCustom = (props: Props) => {
  const { values, handleChange, touched, errors } = useFormikContext<any>();
  return (
    <>
      <div className='flex gap-2'>
        <div className='flex h-5 items-center'>
          <Checkbox name={props.name} value={values[props.name]} id={props.name} onChange={handleChange} />
        </div>
        <div className='flex flex-col'>
          <Label htmlFor={props.name} value={props.textLabel} />
        </div>
      </div>

      {errors[props.name] && touched[props.name] && <div className='text-red-500'>{errors[props.name] as any}</div>}
    </>
  );
};
