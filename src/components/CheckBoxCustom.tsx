import { Checkbox } from 'flowbite-react';
import { useFormikContext } from 'formik';
import React from 'react';

interface Props {
  name: string;
  value: string;
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
      setFieldValue(props.name, values.courses.filter((id: string) => id !== props.value));
    }
  };

  return (
    <div>
      <label>
        <Checkbox
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
