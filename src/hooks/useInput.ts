import { useState } from 'react';

export interface InputType {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useInput = (initialValue: string): InputType => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
