interface Option {
  value: string;
  text: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (newSort: string) => void;
}

const CustomSelect = (props: CustomSelectProps) => {
  const { options, value, onChange } = props;
  const handleChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    onChange(selectedSort);
  };

  return (
    <select value={value} onChange={handleChangeSort}>
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
    </select>
  );
};

export default CustomSelect;
