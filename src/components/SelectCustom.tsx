import { Label, Select } from 'flowbite-react';
import { useFormikContext } from 'formik';

interface Props {
  name:         string;
  textLabel:    string;
  children: JSX.Element[] | JSX.Element | React.ReactNode
}

export const SelectCustom = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext<any>();
  return (
    <>
      <div className='mb-2 block'>
        <Label htmlFor={props.name} value={props.textLabel} />
      </div>

      <Select name={props.name} value={values[props.name]} id={props.name} onChange={handleChange} onBlur={handleBlur}>
        <option value='' disabled hidden>
          Seleccione
        </option>
        {props.children}
      </Select>
      {(errors[props.name] && touched[props.name]) || (touched[props.name] && values[props.name]) ? (
        <div className='text-red-500'>{errors[props.name] as string}</div>
      ) : null}
    </>
  );
};
