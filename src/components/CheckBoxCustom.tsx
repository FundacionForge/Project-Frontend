import { useFormikContext } from 'formik';
import React from 'react';

interface Props {
  name: string;
  value: any;
  textLabel: string;
}

export const CheckBoxCustom = (props: Props) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const [isChecked, setIsChecked] = React.useState(values.courses.includes(props.value));

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);

    if (newValue) {
      setFieldValue(props.name, [...values.courses, props.value]);
    } else {
      setFieldValue(props.name, values.courses.filter((id: any) => id !== props.value));
    }
  };

  return (
    <div>
      <label>
        <input
          type='checkbox'
          name={props.name}
          value={props.value}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {props.textLabel}
      </label>
    </div>
  );
};
