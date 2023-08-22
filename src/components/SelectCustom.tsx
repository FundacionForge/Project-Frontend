import { Label, Select } from 'flowbite-react';
import { useFormikContext } from 'formik';

interface Props {
  name:         string;
  textLabel:    string;
    children: JSX.Element[] | JSX.Element | React.ReactNode
}

export const SelectCustom = (props: Props) => {
  const { values, handleChange } = useFormikContext<any>();
  return (
    <>
      <div className='mb-2 block'>
        <Label htmlFor={props.name} value={props.textLabel} />
      </div>

      <Select name={props.name} value={values[props.name]} id={props.name} onChange={handleChange}>
        <option value='0' disabled>
          Seleccione
        </option>
        {props.children}
      </Select>
    </>
  );
};
