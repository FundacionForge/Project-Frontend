import { Checkbox } from 'flowbite-react';
import { useFormikContext } from 'formik';
import React from 'react';

interface Props {
  name: string;
  value: string;
  textLabel: string;
}

export const CheckBoxCustom = (props: Props) => {
  const { values, setFieldValue, handleBlur, touched, errors } = useFormikContext<any>();

  const isChecked = values[props.name].includes(props.value);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    if (newValue) {
      setFieldValue(props.name, [...values[props.name], props.value]);
    } else {
      setFieldValue(
        props.name,
        values[props.name].filter((id: string) => id !== props.value)
      );
    }
  };

  return (
    <div>
      <label>
        <Checkbox name={props.name} value={props.value} checked={isChecked} onChange={handleCheckboxChange} onBlur={handleBlur} />
        {props.textLabel}
      </label>
      {(errors[props.name] && touched[props.name]) || (touched[props.name] && values[props.name].length > 0) ? (
        <div className='text-red-500'>{errors[props.name] as string}</div>
      ) : null}
    </div>
  );
};
